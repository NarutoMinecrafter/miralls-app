import React from "react";
import {
  Animated,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  LogBox,
  Keyboard,
} from "react-native";
import {
  Colors,
  DefaultColors,
  Navigation,
  DEFAULT_USER_PICTURE,
  Sizes,
} from "../constants";
import UserPictureRounded from "./UserPictureRounded";
import DoubleClick from "react-native-double-click";
import { AntDesign } from "@expo/vector-icons";
import { numberToReadableStr } from "./utils";
import I18n from "i18n-js";
import { Feather } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { setPopupData } from "../redux/actions";

import _ from "./i18n";
import { APIRequest } from "./utils/api";

import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { getComments } from "./utils/post";
import Preloader from "./Preloader";

LogBox.ignoreLogs([
  "componentWillMount has been renamed, and is not recommended for use.",
]);

export default function Post({
  me,

  authorId,
  authorUsername,
  authorPicture,

  postId,
  postMedia,
  postDescription,
  likesCount = 0,
  postDate,

  likedByCurrentUser = false,

  archived = false,
  commentsEnabled = false,

  commentsCount = 0,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const likeAnimation = React.useRef(new Animated.Value(0)).current;

  const [liked, setLiked] = React.useState(likedByCurrentUser);
  const [isArchived, setArchived] = React.useState(archived);
  const [isCommentsEnabled, setCommentsEnabled] =
    React.useState(commentsEnabled);

  const [newCommentText, setNewCommentText] = React.useState("");
  const [comments, setComments] = React.useState();

  // Комментарии включены, либо текущий пользователь является автором поста
  const canSendNewComment = isCommentsEnabled || authorId == me.id;

  // Загружаем комментарии
  function loadComments() {
    getComments(postId, 0, 20).then((_comments) => {
      // console.log(_comments)
      setComments(_comments);
    });
  }

  React.useEffect(() => {
    let isMounted = true;

    if (comments == null && isMounted) {
      loadComments();
    }

    const unsubscribe = navigation.addListener("focus", () => {
      isMounted = false;
      // loadComments()
    });

    return unsubscribe;
  });

  const fadeIn = async (anim, duration = 200) => {
    Animated.timing(anim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = async (anim, duration = 300) => {
    Animated.timing(anim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const Actions = {
    SwitchCommentsEnabled: 0,
    SwitchArchive: 1,
    SwitchLike: 2,
    DeletePost: 3,
    Report: 4,
    SendNewComment: 5,
  };

  async function doSomething(action) {
    var result;

    switch (action) {
      case Actions.SwitchCommentsEnabled:
        result = await APIRequest.post("post/" + postId + "/comments/enabled/");
        setCommentsEnabled(!isCommentsEnabled);

        if (result && result.success) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: _("Success"),
          });
        }

        break;

      case Actions.SwitchArchive:
        result = await APIRequest.post("post/" + postId + "/archive/");
        setArchived(!isArchived);

        if (result && result.success) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: _("Success"),
          });
        }

        if (!isArchived) {
          navigation.navigate(Navigation.Archive);
        } else {
          navigation.navigate(Navigation.Tabs.Profile);
        }

        break;

      case Actions.SwitchLike:
        setLiked(!liked);
        result = await APIRequest.post("post/" + postId + "/like/");
        break;

      case Actions.DeletePost:
        result = await APIRequest.delete("post/" + postId + "/");

        if (result && result.success) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: _("Success"),
          });
        }

        navigation.goBack();

        break;

      case Actions.Report:
        break; //TODO

      case Actions.SendNewComment:
        if (newCommentText && newCommentText != "") {
          const commentText = newCommentText;
          setNewCommentText(null);
          Keyboard.dismiss();

          result = await APIRequest.post("post/" + postId + "/comments", {
            text: commentText,
          });
          if (result && result.success) {
            // comments.push({ // TODO date
            //     user_id: me.id,
            //     user_username: me.username,
            //     text: commentText,
            // })
            loadComments();
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: _("Success"),
            });
          }
        }
        break;
    }
  }

  if (!me || comments == null) return <Preloader />;

  const t = _("Post");

  const showReportMenu = () => {
    dispatch(
      setPopupData({
        showPopup: true,
        rows: [
          {
            // TODO // doSomething(Actions.Report)
          },
        ],
      })
    );
  };

  return (
    <View style={style.Wrapper}>
      <ScrollView style={style.ScrollView}>
        <View style={style.FirstRow.Wrapper}>
          <View style={style.Author.Wrapper}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserScreen", { userId: authorId })
              }
            >
              <View style={style.Author.View}>
                <UserPictureRounded
                  uri={authorPicture}
                  size={36}
                  borderWidth={1}
                  padding={2}
                />
                <Text style={style.Author.Username}>{authorUsername}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={style.FirstRow.Menu.Wrapper}>
            <TouchableOpacity>
              <Feather
                name="more-horizontal"
                size={28}
                color={Colors.Primary}
                onPress={() => {
                  var rows;
                  if (me.id == authorId) {
                    rows = [
                      {
                        text: isCommentsEnabled
                          ? t.Menu.CommentsOff
                          : t.Menu.CommentsOn,
                        iconComponent: Feather,
                        iconName: "message-circle",
                        onPress: () =>
                          doSomething(Actions.SwitchCommentsEnabled),
                      },
                      {
                        text: isArchived
                          ? t.Menu.ReturnFromArchive
                          : t.Menu.AddToArchive,
                        iconComponent: Feather,
                        iconName: "archive",
                        onPress: () => doSomething(Actions.SwitchArchive),
                      },
                      {
                        text: t.Menu.Delete,
                        iconComponent: Feather,
                        iconName: "trash-2",
                        onPress: () => doSomething(Actions.DeletePost),
                      },
                    ];
                  } else {
                    rows = [
                      {
                        text: t.Menu.Report,
                        iconComponent: Feather,
                        iconName: "flag",
                        onPress: () => showReportMenu,
                      },
                    ];
                  }
                  dispatch(
                    setPopupData({
                      showPopup: true,
                      rows: rows,
                    })
                  );
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.Post.Wrapper}>
          <DoubleClick
            onClick={() => {
              fadeIn(likeAnimation);
              setTimeout(() => {
                fadeOut(likeAnimation);
              }, 300);
              if (!liked) {
                doSomething(Actions.SwitchLike);
              }
            }}
          >
            <Animated.View
              style={[
                style.LikeIconAnim.Wrapper,
                {
                  opacity: likeAnimation,
                },
              ]}
            >
              <AntDesign
                style={style.LikeIconAnim.Icon}
                name="heart"
                size={64}
                color={Colors.White}
              />
            </Animated.View>
            <Image
              style={style.Post.Media}
              source={{
                uri: postMedia,
              }}
            />
          </DoubleClick>
        </View>
        <View style={style.Actions.Wrapper}>
          <AntDesign
            name={liked ? "heart" : "hearto"}
            size={24}
            color={liked ? DefaultColors.Red : Colors.Primary}
            onPress={() => {
              doSomething(Actions.SwitchLike);
            }}
          />
          <Text style={style.Actions.LikeCount}>
            {
              // Если изначально пост был лайкнут
              likedByCurrentUser
                ? // ...и пост всё ещё лайкнут - отображаем кол-во лайков,
                  // а если лайк был убран - отображаем кол-во лайков - 1
                  numberToReadableStr(likesCount - (liked ? 0 : 1))
                : // Если пост изначально не был лайкнут
                  // и юзер поставил лайк - отображаем кол-во лайков + 1
                  // если юзер убрал лайк - отображаем кол-во лайков
                  numberToReadableStr(likesCount + (liked ? 1 : 0))
            }
          </Text>
        </View>
        {postDescription ? (
          <View style={style.Description.Wrapper}>
            <Text style={style.Description.Author}>{authorUsername}</Text>
            <Text style={style.Description.Text}>{postDescription}</Text>
          </View>
        ) : null}
        <View style={style.Date.Wrapper}>
          <Text style={style.Date.Text}>
            {new Date(Date.parse(postDate)).toLocaleDateString(I18n.locale)}
          </Text>
        </View>

        {comments.length > 0 ? (
          <View style={style.Comments.Wrapper}>
            {comments.map((comment, i) => {
              // console.log(comment)
              return (
                <Comment
                  key={i}
                  commentId={comment.id}
                  postId={postId}
                  authorId={comment.user_id}
                  authorUsername={comment.user_username}
                  commentText={comment.text}
                  likedByCurrentUser={comment.liked}
                  likesCount={comment.likes_count}
                  setComments={setComments}
                />
              );
            })}
          </View>
        ) : null}
      </ScrollView>

      {canSendNewComment ? (
        <CommentInput
          wrapperStyle={style.CommentInput}
          onChangeText={(text) => {
            setNewCommentText(text);
          }}
          onSubmit={() => {
            doSomething(Actions.SendNewComment);
          }}
          value={newCommentText}
        />
      ) : null}
    </View>
  );
}

const screen = Dimensions.get("window");
const marginH = 12;

const style = {
  Wrapper: {
    height: "100%",
  },
  Author: {
    Wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: 16,
    },
    View: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    Username: {
      color: Colors.Primary,
      fontFamily: "SF-Medium",
      marginLeft: 8,
      fontSize: 16,
    },
  },
  FirstRow: {
    Wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    Menu: {
      Wrapper: {
        marginRight: 16,
      },
    },
  },
  Post: {
    Wrapper: {
      marginVertical: 12,
      marginLeft: 0,
    },
    Media: {
      width: screen.width,
      height: screen.width,
      backgroundColor: "rgba(255,255,255,.2)",
    },
  },
  LikeIconAnim: {
    Wrapper: {
      zIndex: 9999,
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    Icon: {
      // margin: 'auto',
    },
  },
  Actions: {
    Wrapper: {
      marginHorizontal: marginH,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    LikeCount: {
      color: Colors.White,
      marginLeft: 8,
      fontFamily: "SF-Bold",
    },
  },
  Description: {
    Wrapper: {
      // marginVertical: 5,
      marginHorizontal: marginH,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    Author: {
      color: Colors.White,
      fontFamily: "SF-Bold",
    },
    Text: {
      marginLeft: 5,
      color: Colors.White,
      fontFamily: "SF-Regular",
    },
  },
  Date: {
    Wrapper: {
      marginTop: 5,
      marginHorizontal: marginH,
    },
    Text: {
      fontSize: 12,
      color: Colors.SubText,
      fontFamily: "SF-Regular",
    },
  },
  Comments: {
    Wrapper: {
      // borderTopWidth: 1,
      // borderTopColor: 'rgba(255,255,255,.1)',
      marginTop: 8,
      paddingTop: 8,
      marginBottom: 16,
    },
  },
  ScrollView: {
    // height: screen.height - Sizes.Header.Height - Sizes.CommentInput.Height - 29,
    marginBottom: Sizes.Header.Height + Sizes.CommentInput.Height,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  CommentInput: {
    position: "absolute",
    bottom: Sizes.CommentInput.Height,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
};
