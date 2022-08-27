import React from 'react'
import { View, Image } from 'react-native';


export default function UserPictureRounded({
    uri,
    size,
    borderWidth = 2,
    padding = 4,
}) {
    const style = {
        View: {
            borderWidth: borderWidth,
            borderColor: 'rgba(255,255,255,.5)',
            padding: padding,
            borderRadius: 100,
        },
        Image: {
            borderRadius: 100,
            height: size,
            width: size,
        },
    }
    style.View.width = size + padding * 2 + borderWidth * 2

    return (
        <View style={style.View}>
            <Image style={style.Image} source={{ uri: uri }} />
        </View>
    )
}