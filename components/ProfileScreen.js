import React from "react";
import { Entypo, MaterialIcons, Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { Colors, Styles } from "../constants";
import Preloader from "./Preloader";
import _ from "./i18n";

import { Store } from "../redux/store";
import { useDispatch } from "react-redux";
import { setPopupData, setPosts } from "../redux/actions";
import { getPosts } from "./utils/post";
import { Button } from "@react-native-material/core";

import { getUserData, logOut } from "./utils/user";
import Profile from "./Profile";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  // Хук для пользовательских данных
  const [me, _setMe] = React.useState(Store.getState().userReducer);
  const [userPosts, _setUserPosts] = React.useState(null);
  const isFocused = useIsFocused();

  // Загружаем посты
  async function loadPosts() {
    const _posts = await getPosts(userPosts?.length, 20);
    if (_posts) {
      _setUserPosts((prevPosts) =>
        prevPosts ? [...prevPosts, ..._posts] : _posts
      );
    }
  }

  async function loadMe() {
    const _me = await getUserData();
    if (_me) {
      _setMe(_me);
    }
  }

  React.useEffect(() => {
    _setUserPosts(null);
    loadMe();
    loadPosts();
  }, [isFocused]);

  if (!me || userPosts === null) return <Preloader />;

  // Локализация
  const t = _("ProfileScreen");

  return (
    <Profile
      profile={{ user: me, userPosts }}
      loadPosts={loadPosts}
      navigation={navigation}
      isProfile
      rightMenuIcons={
        <>
          <View style={s.RightMenu.Icon}>
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color={Colors.Primary}
              onPress={() => navigation.navigate("WalletScreen")}
            />
          </View>
          <View style={s.RightMenu.Icon}>
            <Entypo
              name="menu"
              size={32}
              color={Colors.Primary}
              onPress={() => {
                dispatch(
                  setPopupData({
                    showPopup: true,
                    rows: [
                      {
                        iconComponent: Feather,
                        iconName: "settings",
                        text: t.Menu.Settings,
                        navigateTo: "SettingsScreen",
                      },
                      {
                        iconComponent: Feather,
                        iconName: "lock",
                        text: t.Menu.ChangePassword,
                        navigateTo: "ChangePasswordScreen",
                      },
                      {
                        iconComponent: Feather,
                        iconName: "archive",
                        text: t.Menu.Archive,
                        navigateTo: "ArchiveScreen",
                      },
                      {
                        iconComponent: Feather,
                        iconName: "help-circle",
                        text: t.Menu.Support,
                        navigateTo: "SupportScreen",
                      },
                      {
                        iconComponent: Feather,
                        iconName: "log-out",
                        text: t.Menu.LogOut,
                        navigateTo: "LoginScreen",
                        onPress: logOut,
                      },
                    ],
                  })
                );
              }}
            />
          </View>
        </>
      }
      actionButtons={
        <>
          <Button
            variant="outlined"
            title={t.Buttons.EditProfile}
            onPress={() => {
              navigation.navigate("EditProfileScreen");
            }}
            style={[
              Styles.ProfileButton.Wrapper,
              Styles.ProfileButton.ButtonStyle,
              Styles.ProfileButton.TextStyle,
            ]}
          />
          <Button
            variant="outlined"
            title={t.Buttons.Archive}
            onPress={() => {
              navigation.navigate("ArchiveScreen");
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
