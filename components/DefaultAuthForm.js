import React from 'react'
import { View, Image } from 'react-native';
import { Sizes, Colors } from '../constants'
import logo from '../assets/logo-black.png';


export default function Form(props) {
    return props.withoutLogo ? (
        <View style={s.GlobalWrapper}>
            <View style={s.Content.Wrapper}>
                {props.content}
            </View>
        </View>
    ) : (
        <View style={[s.GlobalWrapper, s.GlobalWrapper.WithLogo]}>
            <View style={s.Logo.Wrapper}>
                <Image source={logo} style={s.Logo}></Image>
            </View>
            <View style={s.Content.Wrapper}>
                {props.content}
            </View>
        </View>
    )
}

const s = {
    GlobalWrapper: {
		height: '100%',
		width: '100%',
        backgroundColor: Colors.BG,

        WithLogo: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    Logo: {
        width: 496 / 2,
        height: 99 / 2,
        resizeMode: 'stretch',
    },
    Content: {
        Wrapper: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        }
    }
}