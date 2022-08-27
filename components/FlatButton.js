import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Sizes, Colors } from '../constants'

export default function FlatButton({
    text,
    active = true,
    onPress,
    wrapperStyle,
    buttonStyle,
    buttonActiveStyle,
    buttonInactiveStyle,
    textStyle,
}) {
    return (
        <TouchableOpacity style={[
            style.Wrapper,
            wrapperStyle,
        ]} onPress={active ? onPress : null}>
            <View style={[
                active ? style.ActiveButton : style.InactiveButton,
                active ? buttonActiveStyle : buttonInactiveStyle,
                style.Button, buttonStyle,
            ]}>
                <Text style={[
                    style.Text,
                    textStyle
                ]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}


const style = {
    Wrapper: {
        // flexGrow: 1,
    },
    Button: {
        borderRadius: Sizes.Button.BorderRadius,
        paddingVertical: Sizes.Button.PaddingVertical,
        paddingHorizontal: Sizes.Button.PaddingHorizontal,
        boxShadow: '0px 0px 20px 5px %s80' % Colors.Primary,
    },
    ActiveButton: {
        backgroundColor: Colors.Button.BackgroundColor,
    },
    InactiveButton: {
        backgroundColor: Colors.Button.Inactive.BackgroundColor,
    },
    Text: {
        color: Colors.Button.Color,
        fontSize: Sizes.Button.FontSize,
        textAlign: 'center',
        fontFamily: 'SF-Regular',
    },
}
