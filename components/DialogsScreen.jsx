import React from 'react'
import { View, Text } from 'react-native';
import { Sizes, Colors, Navigation } from '../constants'
import _ from "./i18n";
import Header from './Header';
import UserPictureRounded from "./UserPictureRounded";
import { ScrollView } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useDispatch } from 'react-redux';
import { setPopupData } from '../redux/actions';
import { Feather } from '@expo/vector-icons';

export default function DialogsScreen({ navigation: { navigate } }) {
    const dispatch = useDispatch()
    const t = _('DialogsScreen')
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
                  title={t.Title}
                  backButton={true}
                  backButtonText={_("Back")}
                  wrapperStyle={{ marginBottom: 8, paddingHorizontal: 16 }}
                />
                <ScrollView style={s.Content.Messages}>
                  {mockData.map(item => <Pressable style={s.Content.Message.Container} onPress={() => navigate(Navigation.Dialog)} onLongPress={() => {
                    dispatch(setPopupData({
                      showPopup: true,
                      rows: [{
                        text: t.DeleteDialog,
                        iconComponent: Feather,
                        iconName: 'trash-2'
                      },]
                    }))
                  }}>
                    <View style={s.Content.Message}>
                      <View style={s.Content.Message.Avatar}>
                        <UserPictureRounded
                          uri={item.avatar}
                          size={44}
                          borderWidth={1}
                        />
                      </View>
                      <View>
                        <Text style={s.Content.Message.Name}>{item.name}</Text>
                        <View style={s.Content.Message}>

                          <Text style={[
                            s.Content.Message.Text,
                            item.checked ? s.Content.Message.CheckedMessageText : null
                          ]}>{item.lastMessage}</Text>
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
        paddingHorizontal: 8,
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
          margin: 7,
          marginRight: 12,
        },
        Name: {
          color: Colors.White,
          fontWeight: 'bold',
          fontSize: 16
        },
        Text: {
          color: Colors.White,
          fontSize: 16
        },
        CheckedMessageText: {
          color: 'gray',
        },
        Date: {
          color: 'gray'
        },
        Checked: {
          backgroundColor: 'dodgerblue',
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
          marginHorizontal: 5
        }
      }
    }
}