import React from 'react'
import { View } from 'react-native';
import { Sizes, Colors } from '../constants'


export default function DefaultScreen({content=(<></>), wrapperStyle={}}) {

    return (
        <View style={[style.Wrapper, wrapperStyle]}>
            {content}
        </View>
    )
}

const style = {
    Wrapper: {
		height: '100%',
		width: '100%',
        backgroundColor: Colors.BG,
        marginBottom: Sizes.Menu.Height + 16,
    },
}