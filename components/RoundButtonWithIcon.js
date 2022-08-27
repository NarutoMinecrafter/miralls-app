import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Sizes, Colors } from '../constants'

export default function RoundButtonWithIcon({
    active = true,
    onPress,
    wrapperStyle,
    buttonStyle,
    buttonActiveStyle,
    buttonInactiveStyle,
    icon,
    buttonSize = 36,
}) {
    return (
        <TouchableOpacity style={[
            style.Wrapper,
            wrapperStyle,
        ]} onPress={active ? onPress : null}>
            <View style={[
                active ? style.ActiveButton : style.InactiveButton,
                active ? buttonActiveStyle : buttonInactiveStyle,
                style.Button, buttonStyle, {width: buttonSize, height: buttonSize}
            ]}>
                {icon()}
            </View>
        </TouchableOpacity>
    );
}


const style = {
    Wrapper: {
    },
    Button: {
        backgroundColor: '#191919',
        borderColor: '#242424',
        borderWidth: 1,
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        top: 0,
    },
    ActiveButton: {
    },
    InactiveButton: {
    },
}
