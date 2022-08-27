import React from 'react';
import { View } from 'react-native';
import { Colors } from '../constants';
import { Flow } from 'react-native-animated-spinkit';


export default function Preloader(props) {
    var color = props.color ? props.color : Colors.White
    var size = props.size ? props.size : 48

    return (
        <View style={[props.wrapperStyle, style]}>
            <Flow size={size} color={color}/>
        </View>
    )
}

const style = {
    backgroundColor: Colors.BG,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}