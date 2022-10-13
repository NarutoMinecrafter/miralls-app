import React from "react";
import { ScrollView, View } from "react-native";
import { Colors } from "../constants";
import Header from "./Header";
import _ from "./i18n";
import UserItem from "./UserItem";

export default function SubscripersScreen({ navigation }) {
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
              <Header
                  backButton={true}
                  backButtonText={_("Back")}
                  wrapperStyle={{ marginBottom: 0, paddingHorizontal: 16 }}
                />
            <ScrollView style={style.Container}>
                {data.map(item => <UserItem key={item.id} navigation={navigation} {...item} />)}
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
    Container: {
        paddingHorizontal: 10
    },
}