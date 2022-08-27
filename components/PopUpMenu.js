import React from 'react';
import { Pressable, Animated, View, Text } from 'react-native';
import { Colors, Sizes } from '../constants';

import { Store } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setPopupData } from '../redux/actions';

import { useNavigation } from '@react-navigation/native';
import RoundButtonWithIcon from './RoundButtonWithIcon';

const initialValues = {
    showPopup: false,
    rows: [],
}

export default function PopUpMenu({
    menuStyle,
    rowStyle,
}) {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [rows, setRows] = React.useState([])
    const [showPopup, setShowPopup] = React.useState(false)


    React.useEffect(() => {
        let isMounted = true

        function setState() {
            if (isMounted) {
                const state = Store.getState().popUpDataReducer
                // console.log(state)
                setShowPopup(state.showPopup)
                setRows(state.rows)
            }
        }
        if (isMounted) Store.subscribe(setState)

        const unsubscribe = navigation.addListener('focus', () => {
            isMounted = false
        })

        return unsubscribe

    })

    if (!showPopup) return null

    const listRows = rows.map((row, i) => (
        <View style={[style.Row, rowStyle]} key={i}>
            {row.iconComponent && row.iconName ? (
                <row.iconComponent
                    name={row.iconName}
                    size={24}
                    color={Colors.PopUpMenuIcon}
                    style={style.RowElement}
                />
            ) : null}
            <Text
                style={[style.RowElement, style.Text]}
                onPress={() => {
                    dispatch(setPopupData(initialValues))

                    if (row.onPress) {
                        row.onPress()
                    }

                    if (row.navigateTo) {
                        navigation.navigate(row.navigateTo)
                    }
                }}
            >
                {row.text}
            </Text>
        </View>
    ));

    return (
        <View style={style.Wrapper}>
            <Pressable style={[style.Pressable]} onPress={() => {
                dispatch(setPopupData(initialValues))
            }}>

            </Pressable>
            <Animated.View style={[
                style.Menu,
                menuStyle
            ]}>
                <View style={style.Line.Wrapper}>
                    <View style={style.Line.Line}></View>
                </View>
                {listRows}
            </Animated.View>
        </View>
    )
}

const style = {
    Wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        bottom: 0,
        zIndex: 999,
    },
    Pressable: {
        flex: 1,
    },
    Menu: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#262626',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 16,
        paddingTop: 16,
    },
    Row: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    RowElement: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    Text: {
        marginLeft: 12,
        color: Colors.Primary,
        fontFamily: 'SF-Regular',
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: '#313131',
        width: '85%',
    },
    Line: {
        Wrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
        },
        Line: {
            backgroundColor: 'rgba(255,255,255,.3)',
            height: 5,
            width: 55,
            borderRadius: 100,
        }
    }
}