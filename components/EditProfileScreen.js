import React from 'react'
import { Image, View, Dimensions, ScrollView } from 'react-native';
import { Sizes, Colors, DEFAULT_USER_PICTURE } from '../constants'
import DefaultScreen from './DefaultScreen';
import Preloader from './Preloader';
import Header from './Header';
import Input from './Input';
import _ from './i18n';
import * as FieldsValidator from './utils/fieldsValidator';
import { APIRequest } from './utils/api';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import Link from './Link';
import { getUserPictureURL } from './utils/user';

import { Store } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/actions';

import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';


export default function EditProfileScreen({ navigation }) {
    const dispatch = useDispatch()
    const [me, _setMe] = React.useState(Store.getState().userReducer)
    const [userPicture, setUserPicture] = React.useState(me.picture)

    React.useEffect(() => {
        let isMounted = true;

        // Подписываемся на актуальные данные на этом экране
        function setMe() {
            if (isMounted) {
                _setMe(Store.getState().userReducer)
                setUserPicture(me.picture)
                // console.log(userPicture)
            }
        }
        Store.subscribe(setMe)

        return () => { isMounted = false };
    })

    if (!me) return (<Preloader />)

    const t = _('ProfileEditScreen')

    const [name, setName] = React.useState(me.name);

    const [username, setUsername] = React.useState(me.username);
    const [isUsernameValid, setIsUsernameValid] = React.useState(true)
    const [usernameError, setUsernameError] = React.useState(false)

    const [bio, setBio] = React.useState(me.bio);

    // Проверяем валидность введённых данных, выдаём ошибки и т.д.
    async function processForm(
        _name,
        _username,
        _bio,
    ) {
        if (_name != null) {
            await setName(_name)
        }
        if (_username != null) {
            await setUsername(_username)
            var valid = FieldsValidator.isUsernameOrPhoneNumberValid(_username)
            await setIsUsernameValid(valid)
            if (valid) await setUsernameError(false)
        }
        if (_bio != null) {
            await setBio(_bio)
        }
    }

    // Редактирование профиля
    async function EditProfile() {
        // console.log(me.username, username, me.name, name, me.bio, bio)
        if (me.username == username && me.name == name && me.bio == bio) {
            navigation.goBack()
            return
        }

        // Выполняем запрос
        const json = await APIRequest.put('user/', {
            username: username,
            name: name,
            bio: bio,
        })
        if (!json) return

        // Обрабатываем
        if (json.success) {
            var userData = json.data
            userData.picture = getUserPictureURL(json.data.picture)
            dispatch(setUserData(userData))
            navigation.goBack()

        } else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: _('Error').Title,
                textBody: t.Error[json.error_text]
            });
        }
    }

    // Редактировать фото профиля
    async function EditProfilePhoto() {

        // Запрашиваем разрешение на доступ к фотографиям
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: _('Error').Title,
                textBody: _('Error').UNDEFINED
            })
            return
        }

        // Выбор изображения
        let pickerResult = await ImagePicker.launchImageLibraryAsync()
        if (pickerResult.cancelled) return

        // Изображение в base64
        const base64image = (await manipulateAsync(
            pickerResult.uri, [], { base64: true }
        )).base64

        // Выполняем запрос
        const json = await APIRequest.put('user/picture/', {
            picture: base64image,
        })

        if (!json) return

        // Обрабатываем
        if (json.success) {
            var userData = me
            userData.picture = getUserPictureURL(json.data.picture)
            dispatch(setUserData(userData))
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: _('Success'),
                textBody: t.EditProfilePhotoOK,
            })
            // navigation.goBack()

        } else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: _('Error').Title,
                textBody: t.Error[json.error_text]
            });
        }
    }

    // Удалить фото профиля
    async function DeleteProfilePhoto() {

        // Выполняем запрос
        const json = await APIRequest.delete('user/picture/')

        if (!json) return

        // Обрабатываем
        if (json.success) {
            var userData = me
            userData.picture = getUserPictureURL(null)
            setMe(userData)
            dispatch(setUserData(userData))
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: _('Success'),
                textBody: t.EditProfilePhotoOK,
            })

        } else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: _('Error').Title,
                textBody: t.Error[json.error_text]
            });
        }
    }

    return (
        <DefaultScreen content={(
            <View style={s.Wrapper}>

                <Header
                    title={t.Title}
                    rightButton={true}
                    rightButtonOnPress={() => {
                        EditProfile()
                    }}
                />
                <ScrollView>
                <View style={s.Picture.Wrapper}>
                    <View style={s.Picture.View}>
                        <Image
                            style={s.Picture.Image}
                            source={{ uri: userPicture }}
                        />
                        <Link
                            textStyle={s.Picture.Link}
                            text={t.EditProfilePhoto}
                            onPress={() => {
                                EditProfilePhoto()
                            }}
                        />
                        {userPicture != DEFAULT_USER_PICTURE ? (
                            <Link
                                textStyle={s.Picture.Link}
                                text={t.DeleteProfilePhoto}
                                onPress={() => {
                                    DeleteProfilePhoto()
                                }}
                            />
                        ) : null}
                    </View>
                </View>

                <View style={s.Fields}>

                    <Input
                        label={t.Name}
                        placeholder={t.Name}
                        value={me.name}
                        placeholderTextColor={Colors.Input.PlaceholderTextColor}
                        onChangeText={(text) => processForm(text, null, null)}
                    />

                    <Input wrapperStyle={s.Input}
                        label={t.Username}
                        placeholder={t.Username}
                        value={me.username}
                        placeholderTextColor={Colors.Input.PlaceholderTextColor}
                        validationError={usernameError}
                        onChangeText={(text) => processForm(null, text, null)}
                        onEndEditing={() => setUsernameError(!isUsernameValid)}
                    />

                    <Input wrapperStyle={s.Input}
                        label={t.Bio}
                        placeholder={t.BioPlaceholder}
                        value={me.bio}
                        placeholderTextColor={Colors.Input.PlaceholderTextColor}
                        onChangeText={(text) => processForm(null, null, text)}
                    />

                </View>
                </ScrollView>
            </View>
        )} />
    )
}


const s = {
    Wrapper: {
        width: '100%',
        height: '100%',
        position: 'relative',
        padding: Sizes.Screen.Padding,
    },
    Fields: {
        marginBottom: 16,
    },
    Picture: {
        Wrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        View: {
            display: 'flex',
            alignItems: 'center',
            padding: 4,
            borderRadius: 100,
        },
        Image: {
            borderRadius: 100,
            height: 96,
            width: 96,
            marginBottom: 16,
        },
        Link: {
            fontFamily: 'SF-Regular',
            fontSize: 16,
            textAlign: 'center',
        },
    },
    Input: {
        marginTop: Sizes.Input.MarginTop,
    },
    LogOutButton: {
        position: 'absolute',
        width: '100%',
        bottom: Sizes.Screen.Padding,
        left: Sizes.Screen.Padding,
    },
}