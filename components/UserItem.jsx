import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants";
import _ from "./i18n";
import UserPictureRounded from "./UserPictureRounded";

export default function UserItem({ avatar, nickname, name, status, userId }) {
  return (
    <TouchableOpacity style={style.Item} onPress={() => navigation.navigate("UserScreen", { userId })}>
      <UserPictureRounded
          uri={avatar}
          size={55}
          borderWidth={2}
      />
      <View style={style.TextContailer}>
          <Text style={style.Name}>{nickname}</Text>
          <Text style={style.SubText}>{name}</Text>
          <Text style={style.SubText}>{status}</Text>
      </View>
    </TouchableOpacity>
  )
}

const style = {
    Item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    TextContailer: {
        paddingLeft: 5
    },
    Name: {
        color: Colors.White,
        fontWeight: 'bold',
        fontSize: 16
    },
    SubText: {
        color: Colors.SubText
    }
}