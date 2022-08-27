import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../constants'


export default function Link({
    textStyle,
    onPress,
    text
}) {
    const [pressedIn, setPressedIn] = React.useState(false)

    return (
        <Text
            onPress={onPress}
            style={[
                style.Text,
                textStyle,
                pressedIn ? style.TextOnPressIn : null,
            ]}
            onPressIn={() => setPressedIn(true)}
            onPressOut={() => setPressedIn(false)}
        >
            {text}
        </Text>
    );
}

const style = {
    Text: {
        color: Colors.Link.Color,
        paddingRight: 4,
        paddingLeft: 4,
    },
    TextOnPressIn: {
        backgroundColor: Colors.Link.Color + '80',
        borderRadius: 10,
    },
}