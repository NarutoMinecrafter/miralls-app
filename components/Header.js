import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { Sizes, Colors } from '../constants'
import Link from './Link';
import _ from './i18n';
import { useNavigation } from '@react-navigation/native';


export default function Header({
    title,

    backButton = true,
    backButtonText = _('Back'),
    backButtonOnPress,

    rightButton = false,
    rightButtonText = _('Done'),
    rightButtonOnPress,

    wrapperStyle,
}) {
    const navigation = useNavigation()

    return (
        <View style={[style.Wrapper, wrapperStyle]}>
            <View style={style.BackButton.Wrapper}>
                <View style={[
                    style.BackButton.View,
                    backButton ? null : { opacity: 0 }
                ]}>
                    <Text
                        style={style.BackButton.Text}
                        onPress={
                            backButton ? (
                                backButtonOnPress ? backButtonOnPress : () => navigation.goBack()
                            ) : null
                        }
                    >{backButtonText}</Text>
                    {/* <MaterialIcons name="arrow-back-ios" size={Sizes.Header.BackButtonSize} color={Colors.Primary} onPress={() => {
                        navigation.goBack()
                    }}/> */}
                </View>
            </View>
            {title ? (
                <View style={style.Title.Wrapper}>
                    <Text style={style.Title.Text}>
                        {title}
                    </Text>
                </View>
            ) : null}

            <View style={[
                style.RightButton.Wrapper,
                rightButton ? null : { opacity: 0 }
            ]}>
                <Link
                    text={rightButtonText}
                    textStyle={style.RightButton.Link}
                    onPress={
                        rightButton ? rightButtonOnPress : null
                    }
                />
            </View>
        </View>
    )
}

const style = {
    Wrapper: {
		height: Sizes.Header.Height,
		width: '100%',
        backgroundColor: Colors.BG,
        display: 'flex',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.Header.Padding,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: Sizes.Screen.Padding,
        // margin: 'auto',
    },
    Title: {
        Wrapper: {
        },
        Text: {
            color: Colors.Primary,
            fontFamily: 'SF-Bold',
            fontSize: 16,
        },
    },
    BackButton: {
        Wrapper: {
        },
        View: {

        },
        Text: {
            color: Colors.Primary,
            fontFamily: 'SF-Bold',
            fontSize: 14,
        },
    },
    RightButton: {
        Wrapper: {
        },
        Link: {
            fontFamily: 'SF-Bold',
            fontSize: 14,
        },
    },
}