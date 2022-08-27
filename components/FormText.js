import React from 'react';
import { Text, View } from 'react-native';
import { Sizes, Colors } from '../constants'


export default function FormText({
    text,
    textStyle,
    subText,
    subTextStyle,
    wrapperStyle,
}) {
    return (
        <View style={wrapperStyle}>
            <Text style={[style.Text, textStyle]}>
                {text}
            </Text>
            <Text style={[style.SubText, subTextStyle]}>
                {subText}
            </Text>
        </View>
    );
}

const style = {
    Text: {
        marginTop: Sizes.Input.MarginTop,
        fontSize: Sizes.Form.Text.FontSize,
        fontFamily: Sizes.Form.Text.FontFamily,
        color: Colors.Form.Text.Color,
        textAlign: 'center',
    },
    SubText: {
        marginTop: Sizes.Input.MarginTop,
        fontSize: Sizes.Form.SubText.FontSize,
        fontFamily: Sizes.Form.SubText.FontFamily,
        color: Colors.Form.SubText.Color,
        textAlign: 'center',
    },
}