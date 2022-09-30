import React from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { Colors, Styles } from "../constants";
import Preloader from "./Preloader";
import _ from "./i18n";

import { Store } from "../redux/store";
import { getPosts } from "./utils/post";
import { Button } from "@react-native-material/core";

import Profile from "./Profile";
import { APIRequest } from "./utils/api";
import { getUserPictureURL } from "./utils/user";

export default function UserScreen({
  navigation,
  route: {
    params: { userId },
  },
}) {
  // Хук для пользовательских данных
  const [me, _setMe] = React.useState(Store.getState().userReducer);
  const [user, setUser] = React.useState(null);
  const [userPosts, _setUserPosts] = React.useState([]);

  // Загружаем посты
  async function loadPosts() {
    const _posts = await getPosts(userPosts.length, 20, false, userId);
    if (_posts) {
      _setUserPosts((prevPosts) => [...prevPosts, ..._posts]);
    }
  }

  if (userId === me.id) navigation.navigate("ProfileScreen");

  React.useEffect(() => {
    let isMounted = true;

    (async () => {
      const result = await APIRequest.get(`/user/${userId}/`);
      if (result.data) {
        setUser({
          ...result.data,
          picture: getUserPictureURL(result.data.picture),
        });
      }
    })();

    // Подписываемся на актуальные данные на этом экране
    function setMe() {
      if (isMounted) {
        _setMe(Store.getState().userReducer);
      }
    }
    if (isMounted) Store.subscribe(setMe);

    // Список постов
    function setUserPosts() {
      if (isMounted) {
        _setUserPosts(Store.getState().postsReducer);
      }
    }
    if (isMounted) Store.subscribe(setUserPosts);

    if (!userPosts.length) {
      loadPosts();
    }

    const unsubscribe = navigation.addListener("focus", () => {
      isMounted = false;
      // loadPosts()
    });

    return unsubscribe;
  }, []);

  if (!user || !me || userPosts == null) return <Preloader />;

  // Локализация
  const t = _("ProfileScreen");

  return (
    <Profile
      profile={{ user, userPosts }}
      loadPosts={loadPosts}
      navigation={navigation}
      rightMenuIcons={
        <>
          <View style={s.RightMenu.Icon}>
            <Entypo name="bell" size={24} color={Colors.Primary} />
          </View>
          <View style={s.RightMenu.Icon}>
            <Feather name="more-horizontal" size={24} color={Colors.Primary} />
          </View>
        </>
      }
      actionButtons={
        <>
          <Button
            variant="outlined"
            title={t.Buttons.Subscribe}
            onPress={() => {
              alert("Subscribe");
            }}
            style={[
              Styles.ProfileButton.Wrapper,
              Styles.ProfileButton.ButtonStyle,
              Styles.ProfileButton.TextStyle,
            ]}
          />
          <Button
            variant="outlined"
            title={t.Buttons.Message}
            onPress={() => {
              alert("Message");
            }}
            style={[
              Styles.ProfileButton.Wrapper,
              { marginLeft: "2%" },
              Styles.ProfileButton.ButtonStyle,
              Styles.ProfileButton.TextStyle,
            ]}
          />
        </>
      }
    />
  );
}

const s = {
  RightMenu: {
    Icon: {
      marginLeft: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
};
