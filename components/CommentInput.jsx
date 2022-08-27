import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Colors, DefaultColors, Navigation, Sizes } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { numberToReadableStr } from "./utils";
import { Ionicons } from '@expo/vector-icons';
import I18n from "i18n-js";

import { useDispatch } from 'react-redux';
import { setPopupData } from '../redux/actions';

import Input from './Input';

import _ from './i18n';
import { APIRequest } from "./utils/api";

import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useNavigation } from "@react-navigation/native";


export default function CommentInput({
    wrapperStyle,
    onChangeText,
    onSubmit,
    value,
}) {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const t = _('Comment')

    return (
        <View style={[style.Wrapper, wrapperStyle]}>

            <Input
                wrapperStyle={style.Input.Wrapper}
                textInputStyle={style.Input.TextInput}
                placeholder={t.Placeholder}
                placeholderTextColor={Colors.SubText}
                onChangeText={onChangeText}
                value={value}
            />

            <TouchableOpacity
                style={style.SendButton}
                onPress={onSubmit}
            >
                <Ionicons name='send' size={24} color={Colors.Primary} />
            </TouchableOpacity>
        </View>
    )
}

const style = {
    Wrapper: {
        backgroundColor: 'rgba(255,255,255,.06)',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,.08)',
        height: Sizes.CommentInput.Height,
    },
    Input: {
        Wrapper: {
            width: '85%',
            height: Sizes.CommentInput.Height,
        },
        TextInput: {
            height: Sizes.CommentInput.Height,
            borderRadius: 0,
            borderWidth: 0,
            backgroundColor: 'transparent',
        },
    },
    SendButton: {
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
        height: Sizes.CommentInput.Height,
    },
}