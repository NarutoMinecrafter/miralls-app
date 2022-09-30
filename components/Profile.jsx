import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Sizes, Colors } from "../constants";
import DefaultScreen from "./DefaultScreen";
import _ from "./i18n";

import { getPostPictureURL } from "./utils/post";
import UserPictureRounded from "./UserPictureRounded";
import { numberToReadableStr } from "./utils";
import EmptyList from "./EmptyList";
import { Entypo } from "@expo/vector-icons";

export default function Profile({ navigation, profile, loadPosts, rightMenuIcons, actionButtons, isProfile }) {
  const { user, userPosts } = profile

  const t = _("ProfileScreen");

  return (
    <DefaultScreen>
      <View style={s.Wrapper}>
        <FlatList
          data={userPosts}
          numColumns={3}
          keyExtractor={(item) => item.id}
          onEndReached={loadPosts}
          ListEmptyComponent={EmptyList}
          ListHeaderComponent={() => (
            <View style={s.Header}>
              <View style={[s.Row, s.Row.First]}>
                {!isProfile && <Entypo name="back" color={Colors.White} size={24} onPress={() => navigation.goBack()} />}
                <View style={s.Username.View}>
                  <Text style={s.Username.Text}>{user.username}</Text>
                </View>
                <View style={s.RightMenu.View}>
                  {rightMenuIcons}
                </View>
              </View>
              <View style={s.Row}>
                <UserPictureRounded uri={user.picture} size={80} />
                <View style={s.Stats.Wrapper}>
                  <View style={s.Stats.View}>
                    <Text style={s.Stats.Text1}>
                      {numberToReadableStr(user.posts_count)}
                    </Text>
                    <Text style={s.Stats.Text2}>{t.Posts}</Text>
                  </View>
                  <View style={s.Stats.View}>
                    <Text style={s.Stats.Text1}>
                      {numberToReadableStr(user.followers_count)}
                    </Text>
                    <Text style={s.Stats.Text2}>{t.Followers}</Text>
                  </View>
                  <View style={s.Stats.View}>
                    <Text style={s.Stats.Text1}>
                      {numberToReadableStr(user.followed_count)}
                    </Text>
                    <Text style={s.Stats.Text2}>{t.Followed}</Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  s.Bio.View,
                  {
                    marginTop: (user.name != "") | (user.bio != "") ? 16 : 0,
                  },
                ]}
              >
                {user.name != "" ? (
                  <Text style={s.Bio.Name.Text}>{user.name}</Text>
                ) : null}
                {user.bio != "" ? <Text style={s.Bio.Text}>{user.bio}</Text> : null}
              </View>
              <View style={s.Buttons.Wrapper}>
                {actionButtons}
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PostScreen", {
                  me: user,

                  authorId: user.id,
                  authorUsername: user.username,
                  authorPicture: user.picture,

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
