import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants";
import _ from "./i18n";
import UserPictureRounded from "./UserPictureRounded";

export default function SearchScreen({ navigation }) {
    const data = [
        { 
            id: 1,
            avatar: 'https://i.imgur.com/BIZHbJz.jpg',
            nickname: 'kilua.hanter',
            name: 'Kilua Zolduck',
            status: 'Pro hanter 80 lvl'
        },
        { 
            id: 2,
            avatar: 'https://i.imgur.com/BIZHbJz.jpg',
            nickname: 'kilua.hanter',
            name: 'Kilua Zolduck',
            status: 'Pro hanter 80 lvl'
        },
        { 
            id: 3,
            avatar: 'https://i.imgur.com/BIZHbJz.jpg',
            nickname: 'kilua.hanter',
            name: 'Kilua Zolduck',
            status: 'Pro hanter 80 lvl'
        },
        { 
            id: 4,
            avatar: 'https://i.imgur.com/BIZHbJz.jpg',
            nickname: 'kilua.hanter',
            name: 'Kilua Zolduck',
            status: 'Pro hanter 80 lvl'
        },
        { 
            id: 5,
            avatar: 'https://i.imgur.com/BIZHbJz.jpg',
            nickname: 'kilua.hanter',
            name: 'Kilua Zolduck',
            status: 'Pro hanter 80 lvl'
        },
        { 
            id: 6,
            avatar: 'https://i.imgur.com/BIZHbJz.jpg',
            nickname: 'kilua.hanter',
            name: 'Kilua Zolduck',
            status: 'Pro hanter 80 lvl'
        },
        { 
            id: 7,
            avatar: 'https://i.imgur.com/BIZHbJz.jpg',
            nickname: 'kilua.hanter',
            name: 'Kilua Zolduck',
            status: 'Pro hanter 80 lvl'
        },
        { 
            id: 8,
            avatar: 'https://i.imgur.com/BIZHbJz.jpg',
            nickname: 'kilua.hanter',
            name: 'Kilua Zolduck',
            status: 'Pro hanter 80 lvl'
        },
    ]

    return (
        <View style={style.Wrapper}>
            <View style={style.Header}>
                <Text style={style.Bold} onPress={() => navigation.goBack()}>{_("Back")}</Text>
                <TextInput style={style.Input} placeholder={_('Search')} />
            </View>
            <ScrollView style={style.Container}>
                {data.map(item => <TouchableOpacity key={item.id} style={style.Item} onPress={() => navigation.navigate("UserScreen", { userId: item.id })}>
                    <UserPictureRounded
                        uri={item.avatar}
                        size={55}
                        borderWidth={2}
                    />
                    <View>
                        <Text style={style.Bold}>{item.nickname}</Text>
                        <Text style={style.SubText}>{item.name}</Text>
                        <Text style={style.SubText}>{item.status}</Text>
                    </View>
                </TouchableOpacity>)}
            </ScrollView>
        </View>
    )
}

const style = {
    Wrapper: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.BG
    },
    Header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    Input: {
        backgroundColor: '#222',
        color: Colors.White,
        flex: 1,
        borderRadius: 20,
        padding: 5,
        marginLeft: 10,
        fontSize: 15
    },
    Container: {
        paddingHorizontal: 10
    },
    Item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Bold: {
        fontWeight: 'bold'
    },
    SubText: {
        color: Colors.SubText
    }
}