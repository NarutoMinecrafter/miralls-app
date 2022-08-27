import React from 'react';
import { View, Text } from 'react-native';
import { Navigation, Sizes, Colors } from '../constants'
import Input from './Input'
import FlatButton from './FlatButton'
import DefaultAuthForm from './DefaultAuthForm'
import Link from './Link'
import { APIRequest } from './utils/api';
import { setTokens } from './utils/jwt';
import { getHWID } from './utils/hwid';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import * as FieldsValidator from './utils/fieldsValidator';
import _ from './i18n';
import { getUserData } from './utils/user';

import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/actions';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


export default function LoginScreen({
    navigation
}) {
    const dispatch = useDispatch()

    const t = _('Login')

    const [username, setUsername] = React.useState(null);
    const [isUsernameValid, setIsUsernameValid] = React.useState(false)
    const [usernameError, setUsernameError] = React.useState(false)

    const [password, setPassword] = React.useState(null);
    const [isPasswordValid, setIsPasswordValid] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const isFocused = useIsFocused()

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = () => {

                // Если экран сменился на другой
                if (!isFocused) {
                    setUsername(null)
                    setIsUsernameValid(false)
                    setUsernameError(false)
                    setPassword(null)
                    setIsPasswordValid(false)
                    setPasswordError(false)
                }
            }
            return () => unsubscribe();
        })
    )

    // Проверяем валидность введённых данных, выдаём ошибки и т.д.
    function processForm(
        _username,
        _password
    ) {
        if (_username != null) {
            setUsername(_username)
            var valid = FieldsValidator.isUsernameOrPhoneNumberValid(_username)
            setIsUsernameValid(valid)
            if (valid) setUsernameError(false)
        }
        if (_password != null) {
            setPassword(_password)
            var valid = FieldsValidator.isPasswordValid(_password)
            setIsPasswordValid(valid)
            if (valid) setPasswordError(false)
        }
    }

    async function Login() {
        // Выполняем запрос
        const json = await APIRequest.post('login/', {
            username: username,
            password: password,
            hwid: getHWID(),
        }, false)

        if (!json) return

        // Обрабатываем
        if (json.success) {
            await setTokens(json.data.access, json.data.refresh)
            userData = await getUserData()
            dispatch(setUserData(userData))
            navigation.navigate(Navigation.TabNavigation)
        } else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: _('Error').Title,
                textBody: t.Error[json.error_text]
            })
        }
    }

    return (
        <DefaultAuthForm content={(
            <View style={s.Wrapper}>

                <Input wrapperStyle={s.Input}
                    placeholder={t.Username}
                    placeholderTextColor={Colors.Input.PlaceholderTextColor}
                    validationError={usernameError}
                    onChangeText={(text) => processForm(text, null)}
                    onEndEditing={() => setUsernameError(!isUsernameValid)}
                    value={username}
                />

                <Input wrapperStyle={s.Input}
                    placeholder={t.Password}
                    placeholderTextColor={Colors.Input.PlaceholderTextColor}
                    passwordVisiblityButton={true}
                    validationError={passwordError}
                    onChangeText={(text) => processForm(null, text)}
                    onEndEditing={() => setPasswordError(!isPasswordValid)}
                    value={password}
                />

                <View style={s.RestorePassword}>
                    <Text style={s.RestorePassword.Text}>
                        <Link
                            text={t.ForgotPassword}
                            style={s.RestorePassword.Link}
                            onPress={() => {
                                navigation.navigate('RestorePasswordScreen')
                            }}
                        />
                    </Text>
                </View>
                <FlatButton text={t.Button}
                            onPress={() => Login()}
                            wrapperStyle={s.Button}
                            active={isUsernameValid && isPasswordValid}/>
                <View style={s.RegisterOffer}>
                    <Text style={s.RegisterOffer.Text}>
                        {t.MoveToRegisterScreen[0]} <Link text={t.MoveToRegisterScreen[1]}
                            onPress={() => {
                                navigation.navigate(Navigation.Register)
                            }}
                            style={s.RegisterOffer.Link}/>
                    </Text>
                </View>
            </View>
        )} />
    )
}

const s = {
    Wrapper: {
        width: '90%',
    },
	Input: {
        marginTop: Sizes.Input.MarginTop,
	},
    Button: {
        marginTop: Sizes.Input.MarginTop * 2,
    },
    RestorePassword: {
        marginTop: Sizes.Input.MarginTop,
        display: 'flex',
        alignItems: 'flex-end',

        Text: {
            color: Colors.SubText,
            fontSize: 14,
            fontFamily: 'SF-Medium',
        },
        Link: {
            fontWeight: 'bold',
        }
    },
    RegisterOffer: {
        marginTop: Sizes.Input.MarginTop * 2,
        display: 'flex',
        alignItems: 'center',

        Text: {
            color: Colors.SubText,
            fontSize: 14,
            fontFamily: 'SF-Medium',
        },
        Link: {
            fontWeight: 'bold',
        }
    },
}