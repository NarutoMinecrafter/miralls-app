import React from 'react'
import { View, Text } from 'react-native';
import { Sizes, Colors } from '../constants'
import _ from "./i18n";
import Header from './Header';
import UserPictureRounded from "./UserPictureRounded";
import { ScrollView } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useDispatch } from 'react-redux';
import { setPopupData } from '../redux/actions';
import { Feather } from '@expo/vector-icons';

export default function DialogsScreen(props) {
    const dispatch = useDispatch()
    const mockData = [
    { avatar: '', name: 'name', lastMessage: 'Message', date: '1тиж.', checked: false },
    { avatar: '', name: 'name', lastMessage: 'Message', date: '1тиж.', checked: false },
    { avatar: '', name: 'name', lastMessage: 'Message', date: '1тиж.', checked: true },
    { avatar: '', name: 'name', lastMessage: 'Message', date: '1тиж.', checked: true },
  ]
    return (
        <View style={s.GlobalWrapper}>
            <View style={s.Content.Wrapper}>
              <Header
                  title={'Dialogs'}
                  backButton={true}
                  backButtonText={_("Back")}
                  wrapperStyle={{ marginBottom: 8, paddingHorizontal: 16 }}
                />
                <ScrollView style={s.Content.Messages}>
                  {mockData.map(item => <Pressable style={s.Content.Message.Container} onLongPress={() => {
                    dispatch(setPopupData({
                      showPopup: true,
                      rows: [{
                        text: 'Delete dialog', // TODO: Locale,
                        iconComponent: Feather,
                        iconName: 'trash-2'
                      },]
                    }))
                  }}>
                    <View style={s.Content.Message}>
                      <View style={s.Content.Message.Avatar}>
                        <UserPictureRounded
                          uri={item.avatar}
                          size={42}
                          borderWidth={1}
                        />
                      </View>
                      <View>
                        <Text style={s.Content.Message.Text}>{item.name}</Text>
                        <View style={s.Content.Message}>
                          <Text style={s.Content.Message.Text}>{item.lastMessage}</Text>
                          <View style={s.Content.Message.Separator} />
                          <Text  style={s.Content.Message.Date}>{item.date}</Text>
                        </View>
                      </View>
                    </View>
                    {!item.checked && <View style={s.Content.Message.Checked} />}
                  </Pressable>)}
                </ScrollView>
            </View>
        </View>
    )
}

const s = {
    GlobalWrapper: {
		height: '100%',
		width: '100%',
    backgroundColor: Colors.BG,
    },
    Content: {
      Wrapper: {
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
      },
      Messages: {
        width: '100%',
      },
      Message: {
        flexDirection: 'row',
        alignItems: 'center',
        Container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        Avatar: {
          margin: 3
        },
        Text: {
          color: Colors.White
        },
        Date: {
          color: 'gray'
        },
        Checked: {
          backgroundColor: 'lightskyblue',
          width: 6,
          height: 6,
          borderRadius: 12,
          marginHorizontal: 23
        },
        Separator: {
          backgroundColor: 'gray',
          width: 3,
          height: 3,
          borderRadius: 6,
          marginHorizontal: 4
        }
      }
    }
}