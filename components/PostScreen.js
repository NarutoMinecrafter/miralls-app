import React from "react";
import { View } from "react-native";
import { Colors } from "../constants";
import Header from "./Header";
import Post from "./Post";


export default function PostScreen({
    navigation,
    route: {
        params
    }
}) {
    return (
        <View style={style.Wrapper}>
            <Header
                backButton={true}
                backButtonOnPress={params.backButtonOnPress}
                wrapperStyle={{marginHorizontal: 8, marginBottom: 0}}
            />
            <Post {...params}/>
        </View>
    )
}

const style = {
    Wrapper: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.BG
    },
}