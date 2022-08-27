import React from 'react'
import { View, Text } from 'react-native';
import { Navigation, Sizes, Colors, SMS_CODE_LENGTH } from '../constants'
import Input from './Input'
import FlatButton from './FlatButton'
import DefaultAuthForm from './DefaultAuthForm'
import Link from './Link'
import FormText from './FormText'
import { getHWID } from './utils/hwid';
import { intFromString } from './utils';
import { APIRequest, getAccessToken } from './utils/api';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { setTokens } from './utils/jwt';
import _ from './i18n';
import { getUserData } from './utils/user';
import Header from './Header';
import * as FieldsValidator from './utils/fieldsValidator';

import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/actions';


export default function PhoneVerificationScreen({
    navigation,
    route: {
        params: {
            username,
            phoneNumber,
            password,
            passwordAgain
        }
    }
}) {
    const dispatch = useDispatch()

    const [code, setCode] = React.useState('')
    const [isCodeValid, setIsCodeValid] = React.useState(false)
    const [codeError, setCodeError] = React.useState(false)

    // Проверяем валидность введённых данных, выдаём ошибки и т.д.
    function processForm(
        _code,
    ) {
        if (_code != null) {
            setCode(intFromString(_code))
            var valid = FieldsValidator.isCodeValid(_code)
            setIsCodeValid(valid)
            if (valid) setCodeError(false)
        }
    }

    async function Register() {

        // Выполняем запрос
        const json = await APIRequest.post('register/', {
            username: username,
            phone_number: phoneNumber,
            password: password,
            password_again: passwordAgain,
            code: code,
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
                textBody: _('Register').Error[json.error_text]
            });
        }
    }

    const t = _('Register').PhoneConfirmationScreen
    return (
        <DefaultAuthForm withoutLogo={true} content={(
            <View style={s.Wrapper}>
                <Header/>
                <FormText
                    text={t.Title}
                    subText={t.SubText}
                />

                <Input textInputStyle={s.Input}
                    placeholder={t.Code}
                    placeholderTextColor={Colors.Input.PlaceholderTextColor}
                    keyboardType='phone-pad'
                    maxLength={SMS_CODE_LENGTH}
                    validationError={codeError}
                    onChangeText={(text) => processForm(text)}
                    onEndEditing={() => setCodeError(!isCodeValid)}
                />

                <FlatButton text={t.Button}
                            onPress={() => Register()}
                            wrapperStyle={s.Button}
                            active={isCodeValid}/>

            </View>
        )} />
    )
}

const s = {
    Wrapper: {
        width: '90%',
    },
	Input: {
        marginTop: Sizes.Input.MarginTop * 2,
	},
    Button: {
        marginTop: Sizes.Input.MarginTop * 2,
    },
}