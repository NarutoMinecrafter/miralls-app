import React from 'react'
import { View, Image } from 'react-native';
import logo from '../assets/logo-black-2.png';


export default function Logo({
    wrapperStyle,
    logoStyle,
    logoWidth,
    logoHeight,
}) {
    return (
        <View style={[style.Wrapper, wrapperStyle]}>
            <Image source={logo} style={[
                style.Logo,
                logoStyle,
                logoWidth ? { width: logoWidth } : null,
                logoHeight ? { height: logoHeight } : null,
            ]} />
        </View>
    )
}

const style = {
    Wrapper: {
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    Logo: {
        // resizeMode: 'stretch',
    },
}