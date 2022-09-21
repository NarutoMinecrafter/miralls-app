import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Pressable } from "react-native";
import { Colors, DefaultColors, Navigation } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { numberToReadableStr } from "./utils";
import I18n from "i18n-js";
import { Feather } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { setPopupData } from '../redux/actions';

import _ from './i18n';
import { APIRequest } from "./utils/api";

import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useNavigation } from "@react-navigation/native";


export default function Comment({
    authorId,
    authorUsername,

    postId,

    commentId,
    commentText,

    likedByCurrentUser = false,
    likesCount = 0,
}) {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [liked, setLiked] = React.useState(likedByCurrentUser)

    const t = _('Comment')

    const Actions = {
        SwitchLike: 0,
        DeleteComment: 1,
        Report: 2,
    }

    async function doSomething(action) {
        var result

        switch (action) {

            case Actions.SwitchLike:
                result = await APIRequest.post('post/' + postId + '/comment/' + commentId + '/like/')
                setLiked(!liked)
                break

            case Actions.DeleteComment:
                result = await APIRequest.delete('post/' + postId + 'comment/' + commentId + '/')
                console.log('result', result)

                if (result && result.success) {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: _('Success'),
                    })
                }

                break

            case Actions.Report:
                break // TODO
        }
    }

    const showLikeCount =
        (likesCount > 0 || liked) && (
        (likesCount - (liked ? 0 : 1)) > (likedByCurrentUser ? 0 : -1))

    return (
        <Pressable style={style.Comment.Wrapper} onLongPress={() => {
            dispatch(setPopupData({
                showPopup: true,
                rows: [                              {
                    text: t.Delete,
                    iconComponent: Feather,
                    iconName: 'trash-2',
                    onPress: async () => {
                        result = await APIRequest.delete('post/' + postId + 'comment/' + commentId + '/')

                        if (result && result.success) {
                            Toast.show({
                                type: ALERT_TYPE.SUCCESS,
                                title: _('Success'),
                            })
                        }
                    }
                  },]
            }))
        }}>
            <TouchableOpacity
                style={style.Author.Wrapper}
                onPress={() => {
                    alert('@' + authorUsername + ' (ID: ' + authorId + ')')
                }}
            >
                <Text style={style.Author.Username} >
                    {authorUsername}
                </Text>
            </TouchableOpacity>

            <Text style={style.Comment.Text}>
                {commentText}
            </Text>

            <TouchableOpacity
                onPress={() => {
                    doSomething(Actions.SwitchLike)
                }}
            >
                <View style={style.Like.Wrapper}>
                    <AntDesign
                        name={liked ? 'heart' : 'hearto'}
                        size={14}
                        color={liked ? DefaultColors.Red : Colors.SubText}
                    />
                    <Text style={style.Like.Count}>
                        {!showLikeCount ? ' ' : null }
                        {showLikeCount ?
                            // Если изначально пост был лайкнут
                            likedByCurrentUser ?
                            // ...и пост всё ещё лайкнут - отображаем кол-во лайков,
                            // а если лайк был убран - отображаем кол-во лайков - 1
                            numberToReadableStr(likesCount - (liked ? 0 : 1)) :
                            // Если пост изначально не был лайкнут
                            // и юзер поставил лайк - отображаем кол-во лайков + 1
                            // если юзер убрал лайк - отображаем кол-во лайков
                            numberToReadableStr(likesCount + (liked ? 1 : 0))
                        : ' '}
                    </Text>
                </View>
            </TouchableOpacity>
        </Pressable>
    )
}


const screen = Dimensions.get('window')
const marginH = 12

const style = {
    Comment: {
        Wrapper: {
            // maxWidth: screen.width / 2,
            marginHorizontal: marginH,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        Text: {
            color: Colors.SubText,
            fontFamily: 'SF-Regular',
            flexDirection:'row',
            flex: 1,
            flexWrap: 'wrap',
            // borderWidth: 1,
            // borderColor: 'red',
        },
    },
    Author: {
        Wrapper: {
            marginRight: 4,
        },
        Username: {
            color: Colors.White,
            fontFamily: 'SF-Bold',
        },
    },
    Like: {
        Wrapper: {
            marginLeft: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        Count: {
            color: Colors.SubText,
            marginLeft: 6,
            fontFamily: 'SF-Medium',
            fontSize: 14,
        }
    },
}