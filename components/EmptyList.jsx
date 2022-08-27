import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../constants";
import { Feather } from '@expo/vector-icons';
import _ from './i18n';


export default function EmptyList() {
    return (
        <View style={style.Wrapper}>
            <View style={style.Icon}>
                {/* <Text style={style.Icon}>😴</Text> */}
                <Feather name="camera" size={36} color={Colors.SubText} />
            </View>
            <View>
                <Text style={style.Text}>{_('EmptyList')}</Text>
            </View>
        </View>
    )
}


const style = {
    Wrapper: {
        margin: 'auto',
        width: '100%',
        // height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // borderWidth: 2,
        // borderColor: Colors.SubText,
        marginVertical: 16,
    },
    Icon: {
        borderWidth: 3,
        borderColor: Colors.SubText,
        borderRadius: 100,
        padding: 12,
    },
    Text: {
        color: Colors.SubText,
        fontFamily: 'SF-Bold',
        fontSize: 20,
    },
}