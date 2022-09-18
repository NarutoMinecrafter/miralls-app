import React from 'react'
import { View, Text, Image, TextInput, Alert } from 'react-native';
import { Sizes, Colors } from '../constants'
import _ from "./i18n";
import Header from './Header';
import UserPictureRounded from "./UserPictureRounded";
import { ScrollView } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useDispatch } from 'react-redux';
import { setPopupData } from '../redux/actions';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { Dimensions } from 'react-native';

// import {
//   IconButton,
// } from "@react-native-material/core";

export default function DialogScreen(props) {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const [data, setData] = useState({
      '19 СЕРП., 23:00': [
        { text: 'Яка ціна?', me: true },
        { image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg', me: false },
        { text: '10375 грн за 1 диск', me: false },
      ],
      '20 СЕРП., 20:55': [
        { text: 'Червоного коліру немає?', me: true },
        { text: 'Ні, червоні тільки в 17', me: false },
      ],
      })

    return (
        <View style={s.GlobalWrapper}>
              <Header
                  title={'name'}
                  backButton={true}
                  backButtonText={_("Back")}
                  wrapperStyle={{ marginBottom: 8, paddingHorizontal: 16 }}
                />
                <View>
                <ScrollView style={s.Content.Messages}>
                  {Object.keys(data).map(key => <>
                    <Text style={s.Content.Date}>{key}</Text>
                    {data[key].map(item => <Pressable onLongPress={() => {
                    dispatch(setPopupData({
                      showPopup: true,
                      rows: [{
                        text: 'Edit message', // TODO: Locale,
                        iconComponent: Feather,
                        iconName: 'edit'
                      },]
                    }))
                  }}>
                      {item.image ? <Image style={s.Content.Image} source={{ uri: item.image }} width={300} height={200} /> : <Text style={[s.Content.Text, item.me ? s.Content.Author : {}]}>{item.text}</Text>}
                    </Pressable>)}
                  </>)}
                </ScrollView>
                <View style={s.Content.InputContainer}>
                  <View style={s.Content.ImageInput}>
                    <TextInput 
                      style={s.Content.Input}
                      placeholderTextColor={'gray'}
                      placeholder='Напишіть повідомлення...' // TODO: Locale,
                      value={value}
                      onTextInput={setValue}
                    />
                  </View>
                  {value ? <Ionicons name='send' size={24} color={'dodgerblue'} onPress={() => Alert.alert('Send')} /> : <View style={s.Content.ImageInput}>
                    <Feather style={s.Content.ImageIcon} name='camera' size={24} color={Colors.White} />
                    <Feather name='image' size={24} color={Colors.White} />
                  </View>}
                </View>
          </View>
        </View>
    )
}

const s = {
    GlobalWrapper: {
		height: '100%',
		width: '100%',
    backgroundColor: Colors.BG,
    justifyContent: 'space-between',
  },
    Content: {
      Messages: {
        width: '100%',
        maxHeight: Dimensions.get('window').height - Sizes.Header.Height - 90,
      },
      Text: {
        color: Colors.White,
        backgroundColor: '#333',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 20,
        margin: 3,
        fontSize: 15
      },
      Author: {
        backgroundColor: 'dodgerblue',
        alignSelf: 'flex-end',
      },
      Date: {
        textAlign: 'center',
        color: 'gray',
        margin: 10
      },
      Image: {
        width: 300,
		  height: 200,
        borderRadius: 20
      },
      InputContainer: {
        backgroundColor: '#222',
		    width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 5,
        paddingRight: 10,
        marginTop: 5
      },
      ImageIcon: {
        marginRight: 5,
      },
      ImageInput: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      Input: {
        color: Colors.White,
        marginHorizontal: 5,
        fontSize: 15
      }
    }
}
