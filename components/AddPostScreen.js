import React from "react";
import {
  Image,
  View,
  Dimensions,
  Platform,
  FlatList,
  Text,
} from "react-native";
import {
  Styles,
  Colors,
  NEW_POST_LOAD_IMAGES_COUNT,
  Sizes,
} from "../constants";
import DefaultScreen from "./DefaultScreen";
import Preloader from "./Preloader";
import Header from "./Header";
import Input from "./Input";
import { Feather } from "@expo/vector-icons";
import _ from "./i18n";
import * as FieldsValidator from "./utils/fieldsValidator";
import { APIRequest } from "./utils/api";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import Link from "./Link";
import { getUserPictureURL } from "./utils/user";

import { Store } from "../redux/store";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/actions";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { manipulateAsync } from "expo-image-manipulator";
import RoundButtonWithIcon from "./RoundButtonWithIcon";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { getPostPictureURL } from "./utils/post";
import { secondsToMinutesSeconds } from "./utils";

const ScreenType = {
  SelectMedia: 0,
  Other: 1,
};

export default function EditProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const [me, _setMe] = React.useState(Store.getState().userReducer);
  const [screen, setScreen] = React.useState(ScreenType.SelectMedia);

  const [persmissionGranted, setPermissionsGranted] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [images, setImages] = React.useState([]);

  async function loadImages() {
    MediaLibrary.getAssetsAsync({
      // first: NEW_POST_LOAD_IMAGES_COUNT,
      after: images.length.toString(),
      mediaType:
        Platform.OS === "android" && Platform.constants.Release < 11
          ? [MediaLibrary.MediaType.photo]
          : [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
      sortBy: "creationTime",
    }).then((r) => {
      // ?????????????? thumbnails
      let assets = [];
      r.assets.forEach((e, i) => {
        if (!e.uri.includes("thumbnail")) {
          assets.push(e);
        }
      });
      setImages((prevImages) => [...prevImages, ...assets]);
      if (assets.length > 0) setSelectedImage(assets[0].uri);
    });
  }

  const isFocused = useIsFocused();

  React.useEffect(() => {
    let isMounted = true;

    MediaLibrary.requestPermissionsAsync().then((result) => {
      if (result.granted == true) {
        setPermissionsGranted(true);
      }
    });

    if (!images.length && persmissionGranted) {
      loadImages();
    }

    // ?????????????????????????? ???? ???????????????????? ???????????? ???? ???????? ????????????
    function setMe() {
      if (isMounted) {
        _setMe(Store.getState().userReducer);
      }
    }
    Store.subscribe(setMe);

    const unsubscribe = navigation.addListener("focus", () => {
      isMounted = false;
      setImages([]);
      setScreen(ScreenType.SelectMedia);
    });

    return unsubscribe;
  });

  const t = _("AddPostScreen");

  const [description, setDescription] = React.useState(null);

  // ?????????????????? ???????????????????? ?????????????????? ????????????, ???????????? ???????????? ?? ??.??.
  async function processForm(_description) {
    if (_description != null) {
      await setDescription(_description);
    }
  }

  // ????????????
  async function doRequest() {
    // ?????????????????????? ?? base64
    const base64image = (
      await manipulateAsync(selectedImage, [], { base64: true })
    ).base64;

    // ?????????????????? ????????????
    const json = await APIRequest.post("post/", {
      media: base64image,
      description: description,
    });

    if (!json) return;

    // ????????????????????????
    if (json.success) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: _("Success"),
      });
      navigation.navigate("PostScreen", {
        me: me,

        // backButtonOnPress: () => {
        //     navigation.navigate('ProfileScreen')
        // },

        authorId: me.id,
        authorUsername: me.username,
        authorPicture: me.picture,

        postId: json.data.id,
        postMedia: getPostPictureURL(json.data.media),
        postDescription: json.data.description,
        postLikesCount: json.data.likes_count,
        postDate: json.data.date,

        commentsCount: json.data.comments_count,
        likedByCurrentUser: json.data.liked,
        commentsEnabled: json.data.comments_enabled,
      });
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: _("Error").Title,
        textBody: t.Error[json.error_text],
      });
    }
  }

  async function getImageFromGalery() {
    // ?????????????????????? ???????????????????? ???? ???????????? ?? ??????????????????????
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: _("Error").Title,
        textBody: _("Error").UNDEFINED,
      });
      return;
    }

    // ?????????? ??????????????????????
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) return;

    setSelectedImage(pickerResult.uri);
  }

  if (!isFocused || images == null) {
    return <Preloader />;
  }

  switch (screen) {
    case ScreenType.SelectMedia:
      return (
        <DefaultScreen
          wrapperStyle={{ margin: 0 }}
          content={
            <View style={s.Wrapper}>
              <Header
                title={t.Title}
                backButton={true}
                backButtonText={_("Cancel")}
                rightButton={true}
                rightButtonText={_("Next")}
                wrapperStyle={{ marginBottom: 8, paddingHorizontal: 16 }}
                rightButtonOnPress={() => {
                  setScreen(ScreenType.Other);
                }}
              />

              <Image style={s.Image.Selected} source={{ uri: selectedImage }} />
              <View style={s.Row.Wrapper}>
                <View style={s.Row.Element}>
                  <Text style={s.Row.Text}>{t.SelectMedia.Recent}</Text>
                  <Feather
                    name="chevron-down"
                    size={16}
                    color={Colors.Primary}
                  />
                </View>
                <View style={s.Row.Element}>
                  <RoundButtonWithIcon
                    wrapperStyle={s.Row.RightButton}
                    icon={() => (
                      <Feather name="image" size={16} color={Colors.Primary} />
                    )}
                    buttonSize={32}
                    onPress={getImageFromGalery}
                  />
                  {/* <RoundButtonWithIcon
                    wrapperStyle={s.Row.RightButton}
                    icon={() => (
                      <Feather name="camera" size={16} color={Colors.Primary} />
                    )}
                    buttonSize={32}
                    onPress={() => alert("Open camera")}
                  /> */}
                </View>
              </View>

              <FlatList
                style={s.Images.View}
                data={images}
                numColumns={4}
                keyExtractor={(item) => item.id}
                onEndReached={loadImages}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={s.Image.View}
                      onTouchEnd={() => {
                        setSelectedImage(item.uri);
                      }}
                    >
                      <Image style={s.Image.Image} source={{ uri: item.uri }} />
                      <Text style={s.Image.Duration}>
                        {item.duration
                          ? secondsToMinutesSeconds(item.duration)
                          : ""}
                      </Text>
                    </View>
                  );
                }}
              />

              {/* <View style={s.Fields}>
                <Input
                  wrapperStyle={s.Input}
                  // label={t.Description}
                  placeholder={t.Description}
                  value={description}
                  placeholderTextColor={Colors.Input.PlaceholderTextColor}
                  onChangeText={(text) => processForm(text)}
                />
              </View> */}
            </View>
          }
        />
      );

    case ScreenType.Other:
      return (
        <DefaultScreen
          wrapperStyle={{ padding: Sizes.Screen.Padding }}
          content={
            <View style={s.Wrapper}>
              <Header
                title={t.Title}
                backButton={true}
                backButtonText={_("Back")}
                backButtonOnPress={() => setScreen(ScreenType.SelectMedia)}
                rightButton={true}
                wrapperStyle={{
                  marginTop: -Sizes.Screen.Padding,
                  marginBottom: 8,
                }}
                rightButtonText={_("Done")}
                rightButtonOnPress={() => doRequest()}
              />

              <View style={s.Other.Wrapper}>
                <Image
                  style={[s.Other.SelectedImage, s.Other.Element]}
                  source={{ uri: selectedImage }}
                />

                <Input
                  wrapperStyle={s.Other.DescriptionInputWrapper}
                  textInputStyle={s.Other.DescriptionInput}
                  placeholder={t.Other.Description}
                  value={description}
                  placeholderTextColor={Colors.Input.PlaceholderTextColor}
                  onChangeText={(text) => processForm(text)}
                  multiline={true}
                />
              </View>
            </View>
          }
        />
      );
  }
}

const screenDismensions = Dimensions.get("window");

const s = {
  Wrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    // padding: Sizes.Screen.Padding,
  },
  Row: {
    Wrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "space-between",
      height: 50,
      paddingHorizontal: 16,
    },
    Element: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      // borderColor: 'red',
      // borderWidth: 1,
      // margin: 'auto',
    },
    Text: {
      color: Colors.Primary,
      fontSize: 14,
      fontFamily: "SF-Bold",
      marginRight: 4,
    },
    RightButton: {
      marginLeft: 8,
    },
  },
  Images: {
    View: {
      // marginTop: 8,
      width: "100%",
      height: "100%",
      display: "flex",
      flexWrap: "wrap",
      alignContent: "flex-start",
      // justifyContent: 'space-between',
      flexDirection: "row",
    },
  },
  Image: {
    Selected: {
      width: Math.trunc(screenDismensions.width),
      height: Math.trunc(screenDismensions.width),
    },
    View: {
      margin: 1,
      position: "relative",
    },
    Image: {
      width: Math.trunc(screenDismensions.width) / 4 - 2,
      height: Math.trunc(screenDismensions.width) / 4 - 2,
    },
    Duration: {
      position: "absolute",
      right: 3,
      bottom: 3,
    },
  },
  Other: {
    Wrapper: {
      display: "flex",
      flexDirection: "row",
    },
    SelectedImage: {
      width: Math.trunc(screenDismensions.width) / 5,
      height: Math.trunc(screenDismensions.width) / 5,
      borderRadius: Sizes.Input.BorderRadius,
      borderWidth: 1,
      borderColor: Colors.Input.BorderColor,
    },
    DescriptionInputWrapper: {
      marginLeft: 8,
    },
    DescriptionInput: {
      textAlignVertical: "top",
    },
  },
};

s.Other.DescriptionInputWrapper.width =
  // ?????? ??????????
  screenDismensions.width -
  s.Other.SelectedImage.width -
  // ?????? ????????????????
  Sizes.Screen.Padding * 2 -
  // ?????? ????????????????
  8;

s.Other.DescriptionInput.height = s.Other.SelectedImage.height;
