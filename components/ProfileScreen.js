import React from "react";
import { Entypo, MaterialIcons, Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Sizes, Colors, Styles } from "../constants";
import DefaultScreen from "./DefaultScreen";
import Preloader from "./Preloader";
import _ from "./i18n";

import { Store } from "../redux/store";
import { useDispatch } from "react-redux";
import { setPopupData, setPosts } from "../redux/actions";
import { getPostPictureURL, getPosts } from "./utils/post";
import UserPictureRounded from "./UserPictureRounded";
import { numberToReadableStr } from "./utils";
import EmptyList from "./EmptyList";
import { Button } from "@react-native-material/core";

import { logOut } from "./utils/user";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  // Хук для пользовательских данных
  const [me, _setMe] = React.useState(Store.getState().userReducer);
  const [userPicture, setUserPicture] = React.useState(me.picture);
  const [userPosts, _setUserPosts] = React.useState([]);

  // Загружаем посты
  async function loadPosts() {
    const _posts = await getPosts(userPosts.length, 20);
    if (_posts) {
      _setUserPosts((prevPosts) => [...prevPosts, ..._posts]);
      dispatch(setPosts(userPosts));
    }
    console.log(_posts.length)
  }

  React.useEffect(() => {
    let isMounted = true;

    // Подписываемся на актуальные данные на этом экране
    function setMe() {
      if (isMounted) {
        _setMe(Store.getState().userReducer);
        setUserPicture(me.picture);
        // console.log(userPicture)
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

  if (!me || userPosts == null) return <Preloader />;

  // Локализация
  const t = _("ProfileScreen");

  return (
    <DefaultScreen>
      <View style={s.Wrapper}>
        <FlatList
          style={s.List}
          data={userPosts}
          numColumns={3}
          keyExtractor={(item) => item.id}
          onEndReached={loadPosts}
          ListEmptyComponent={EmptyList}
          ListHeaderComponent={() => (
            <View style={s.Header}>
              <View style={[s.Row, s.Row.First]}>
                <View style={s.Username.View}>
                  <Text style={s.Username.Text}>{me.username}</Text>
                </View>
                <View style={s.RightMenu.View}>
                  <View style={s.RightMenu.Icon}>
                    <MaterialIcons
                      name="account-balance-wallet"
                      size={24}
                      color={Colors.Primary}
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
                </View>
              </View>
              <View style={s.Row}>
                <UserPictureRounded uri={userPicture} size={80} />
                <View style={s.Stats.Wrapper}>
                  <View style={s.Stats.View}>
                    <Text style={s.Stats.Text1}>
                      {numberToReadableStr(me.posts_count)}
                    </Text>
                    <Text style={s.Stats.Text2}>{t.Posts}</Text>
                  </View>
                  <View style={s.Stats.View}>
                    <Text style={s.Stats.Text1}>
                      {numberToReadableStr(me.followers_count)}
                    </Text>
                    <Text style={s.Stats.Text2}>{t.Followers}</Text>
                  </View>
                  <View style={s.Stats.View}>
                    <Text style={s.Stats.Text1}>
                      {numberToReadableStr(me.followed_count)}
                    </Text>
                    <Text style={s.Stats.Text2}>{t.Followed}</Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  s.Bio.View,
                  {
                    marginTop: (me.name != "") | (me.bio != "") ? 16 : 0,
                  },
                ]}
              >
                {me.name != "" ? (
                  <Text style={s.Bio.Name.Text}>{me.name}</Text>
                ) : null}
                {me.bio != "" ? <Text style={s.Bio.Text}>{me.bio}</Text> : null}
              </View>
              <View style={s.Buttons.Wrapper}>
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
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PostScreen", {
                  me: me,

                  authorId: me.id,
                  authorUsername: me.username,
                  authorPicture: userPicture,

                  postId: item.id,
                  postMedia: getPostPictureURL(item.media),
                  postDescription: item.description,
                  likesCount: item.likes_count,
                  postDate: item.date,

                  archived: item.archived,
                  commentsEnabled: item.comments_enabled,

                  commentsCount: item.comments_count,
                  likedByCurrentUser: item.liked,
                });
              }}
            >
              <View style={s.Posts.Post.View}>
                <Image
                  style={s.Posts.Post.Image}
                  source={{ uri: getPostPictureURL(item.media) }}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </DefaultScreen>
  );
}

const screen = Dimensions.get("window");

const s = {
  Wrapper: {},
  Header: {
    padding: Sizes.Screen.Padding,
  },
  Username: {
    View: {
      marginLeft: 8,
    },
    Text: {
      color: Colors.Primary,
      fontFamily: "SF-Bold",
      fontSize: 26,
    },
  },
  Bio: {
    View: {},
    Name: {
      Text: {
        color: Colors.Primary,
        fontFamily: "SF-Bold",
        fontSize: 16,
      },
    },
    Text: {
      marginTop: -8,
      color: Colors.Primary,
      fontFamily: "SF-Regular",
      fontSize: 16,
    },
  },
  RightMenu: {
    View: {
      display: "flex",
      flexDirection: "row",
    },
    Icon: {
      marginLeft: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  Row: {
    First: {
      justifyContent: "space-between",
      marginBottom: 16,
    },

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Stats: {
    Wrapper: {
      marginLeft: 10,
      display: "flex",
      flexDirection: "row",
    },
    View: {
      width: 100,
      marginLeft: -10,
    },
    Text1: {
      color: Colors.Primary,
      fontFamily: "SF-Bold",
      fontSize: 18,
      textAlign: "center",
    },
    Text2: {
      color: Colors.Primary,
      fontFamily: "SF-Regular",
      fontSize: 14,
      textAlign: "center",
      marginTop: -10,
    },
  },
  Buttons: {
    Wrapper: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      marginTop: 8,
    },
  },
  Posts: {
    View: {
      marginTop: 8,
      // borderTopWidth: 1,
      // borderColor: 'rgba(255,255,255,.1)',
      width: "100%",
      height: "100%",
      "overflow-y": "scroll",
      display: "flex",
      flexWrap: "wrap",
      alignContent: "flex-start",
      flexDirection: "row",
    },
    Post: {
      View: {
        margin: 1,
      },
      Image: {
        width: Math.trunc(screen.width) / 3 - 2,
        height: Math.trunc(screen.width) / 3 - 2,
      },
    },
  },
};
