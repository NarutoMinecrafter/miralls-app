import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Sizes, Colors, Navigation } from "../constants";
import Logo from "./Logo";
import Post from "./Post";

import { Feather } from "@expo/vector-icons";

export default function FeedScreen({ navigation: { navigate } }) {
  return (
    <View style={s.GlobalWrapper}>
      <ScrollView>
        <View style={s.Header.View}>
          <View style={s.Header.Element}>
            <Logo
              wrapperStyle={s.Header.LogoWrapper}
              logoWidth={Sizes.FeedHeader.LogoSize}
              logoHeight={Sizes.FeedHeader.LogoSiz}
            />
          </View>
          <View style={[s.Header.Element, s.RightMenu.View]}>
            <View style={s.RightMenu.Icon}>
              <Feather
                name="search"
                size={28}
                color={Colors.Primary}
                onPress={() => {
                  navigate(Navigation.Search);
                }}
              />
            </View>
            <View style={s.RightMenu.Icon}>
              <Feather
                name="message-circle"
                size={28}
                color={Colors.Primary}
                onPress={() => navigate(Navigation.Dialogs)}
              />
            </View>
          </View>
        </View>
        <View style={s.Feed.Wrapper}></View>
      </ScrollView>
    </View>
  );
}

const s = {
  GlobalWrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.BG,
  },
  Header: {
    View: {
      paddingHorizontal: 16,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: Sizes.FeedHeader.Height,
      // borderWidth: 1,
      // borderColor: 'red',
    },
    Element: {},
    LogoWrapper: {
      height: Sizes.FeedHeader.Height,
    },
  },
  RightMenu: {
    View: {
      display: "flex",
      flexDirection: "row",
    },
    Icon: {
      marginLeft: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  Content: {
    Wrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
  },
  Feed: {
    Wrapper: {},
  },
};
