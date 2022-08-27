import React from "react";
import { View } from "react-native";
import { Colors } from "../constants";
import Header from "./Header";


export default function SearchScreen({
    navigation,
    route: {
        params
    }
}) {
    return (
        <View style={style.Wrapper}>
            <Header
                backButton={true}
                wrapperStyle={{marginHorizontal: 8, marginBottom: 0}}
            />
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