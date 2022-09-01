import React from "react";
import { View, Text } from "react-native";
import { Navigation, Sizes, Colors, SMS_CODE_LENGTH } from "../constants";
import Input from "./Input";
import DefaultAuthForm from "./DefaultAuthForm";
import Link from "./Link";
import FormText from "./FormText";
import { APIRequest } from "./utils/api";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { getHWID } from "./utils/hwid";
import { getUserData } from "./utils/user";
import { setTokens } from "./utils/jwt";
import Header from "./Header";
import * as FieldsValidator from "./utils/fieldsValidator";
import _ from "./i18n";
import { Button, TextInput } from "@react-native-material/core";

import { useDispatch } from "react-redux";
import { setUserData } from "../redux/actions";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const ScreenType = {
  Register: 0,
  Code: 1,
};

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const [screen, setScreen] = React.useState(ScreenType.Register);

  const [username, setUsername] = React.useState(null);
  const [isUsernameValid, setIsUsernameValid] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);

  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = React.useState(false);
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);

  const [password, setPassword] = React.useState(null);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [passwordAgain, setPasswordAgain] = React.useState(null);
  const [isPasswordAgainValid, setIsPasswordAgainValid] = React.useState(false);
  const [passwordAgainError, setPasswordAgainError] = React.useState(false);

  const [code, setCode] = React.useState(null);
  const [isCodeValid, setIsCodeValid] = React.useState(false);
  const [codeError, setCodeError] = React.useState(false);

  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => {
        // Если экран сменился на другой
        if (!isFocused) {
          setScreen(ScreenType.Register);

          setUsername(null);
          setIsUsernameValid(false);
          setUsernameError("");

          setPhoneNumber(null);
          setIsPhoneNumberValid(false);
          setPhoneNumberError("");

          setCode(null);
          setIsCodeValid(false);
          setCodeError("");

          setPassword(null);
          setIsPasswordValid(false);
          setPasswordError("");

          setPasswordAgain(null);
          setIsPasswordAgainValid(false);
          setPasswordAgainError("");
        }
      };
      return () => unsubscribe();
    })
  );

  // Проверяем валидность введённых данных, выдаём ошибки и т.д.
  function processForm(
    _username,
    _phoneNumber,
    _password,
    _passwordAgain,
    _code
  ) {
    if (_username != null) {
      setUsername(_username);
      var valid = FieldsValidator.isUsernameValid(_username);
      setIsUsernameValid(valid);
      if (valid) setUsernameError("");
    }
    if (_phoneNumber != null) {
      setPhoneNumber(_phoneNumber);
      var valid = FieldsValidator.isPhoneNumberValid(_phoneNumber);
      setIsPhoneNumberValid(valid);
      if (valid) setPhoneNumberError("");
    }
    if (_password != null) {
      setPassword(_password);
      var valid = FieldsValidator.isPasswordValid(_password);
      setIsPasswordValid(valid);
      if (valid) setPasswordError("");
    }
    if (_passwordAgain != null) {
      setPasswordAgain(_passwordAgain);
      var valid = FieldsValidator.isPasswordValid(_passwordAgain);
      setIsPasswordAgainValid(valid);
      if (valid) setPasswordAgainError("");
    }
    if (_code != null) {
      setCode(_code);
      var valid = FieldsValidator.isCodeValid(_code);
      setIsCodeValid(valid);
      if (valid) setCodeError("");
    }
  }

  var t = _("Register");

  async function PhoneVerification() {
    // Выполняем запрос
    const json = await APIRequest.post(
      "register/phone/",
      {
        username: username,
        phone_number: phoneNumber,
        password: password,
        password_again: passwordAgain,
        hwid: getHWID(),
      },
      false
    );

    if (!json) return;

    // Обрабатываем
    if (json.success) {
      setScreen(ScreenType.Code);
    } else {
      if (json.data) var seconds = json.data.seconds;
      else var seconds = "";
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: _("Error").Title,
        textBody: json.error_text
          ? t.Error[json.error_text].replace("{seconds}", seconds)
          : null,
      });
    }
  }

  async function Register() {
    // Выполняем запрос
    const json = await APIRequest.post(
      "register/",
      {
        username: username,
        phone_number: phoneNumber,
        password: password,
        password_again: passwordAgain,
        code: code,
        hwid: getHWID(),
      },
      false
    );

    if (!json) return;

    // Обрабатываем
    if (json.success) {
      await setTokens(json.data.access, json.data.refresh);
      userData = await getUserData();
      dispatch(setUserData(userData));
      navigation.navigate(Navigation.TabNavigation);
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: _("Error").Title,
        textBody: _("Register").Error[json.error_text],
      });
    }
  }

  switch (screen) {
    case ScreenType.Register:
      t = _("Register");
      var s = registerStyle;

      return (
        <DefaultAuthForm
          content={
            <View style={s.Wrapper}>
              <Input
                wrapperStyle={s.Input}
                placeholder={t.Username}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                validationErrorText={usernameError}
                onChangeText={(text) => processForm(text, null, null, null)}
                value={username}
                onEndEditing={() =>
                  setUsernameError(
                    isUsernameValid ? "" : t.ValidationError.InvalidName
                  )
                }
              />

              <Input
                wrapperStyle={s.Input}
                placeholder={t.PhoneNumber}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                textContentType="telephoneNumber"
                dataDetectorTypes="phoneNumber"
                keyboardType="phone-pad"
                maxLength={14}
                validationErrorText={phoneNumberError}
                onChangeText={(text) => processForm(null, text, null, null)}
                onEndEditing={() =>
                  setPhoneNumberError(
                    isPhoneNumberValid ? "" : t.ValidationError.InvalidPhone
                  )
                }
                value={phoneNumber}
              />

              <Input
                wrapperStyle={s.Input}
                placeholder={t.Password}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                passwordVisiblityButton={true}
                validationErrorText={passwordError}
                onChangeText={(text) => processForm(null, null, text, null)}
                onEndEditing={() =>
                  setPasswordError(
                    isPasswordValid ? "" : t.ValidationError.InvalidPassword
                  )
                }
                value={password}
              />

              <Input
                wrapperStyle={s.Input}
                placeholder={t.PasswordAgain}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                passwordVisiblityButton={true}
                validationErrorText={passwordAgainError}
                onChangeText={(text) => processForm(null, null, null, text)}
                onEndEditing={() =>
                  setPasswordAgainError(
                    isPasswordAgainValid
                      ? ""
                      : t.ValidationError.InvalidPassword
                  )
                }
                value={passwordAgain}
              />
              <Button
                title={t.Button}
                onPress={PhoneVerification}
                style={s.Button}
                disabled={
                  !(
                    isUsernameValid &&
                    isPasswordValid &&
                    isPasswordAgainValid &&
                    isPhoneNumberValid
                  )
                }
              />
              <View style={s.RegisterOffer}>
                <Text style={s.RegisterOffer.Text}>
                  {t.AlreadyHaveAnAccount[0]}
                  <Link
                    text={t.AlreadyHaveAnAccount[1]}
                    onPress={() => {
                      navigation.navigate(Navigation.Login);
                    }}
                    style={s.RegisterOffer.Link}
                  />
                </Text>
              </View>
            </View>
          }
        />
      );

    case ScreenType.Code:
      t = _("Register").PhoneConfirmationScreen;
      var s = phoneConfirmationStyle;

      return (
        <DefaultAuthForm
          withoutLogo={true}
          content={
            <View style={s.Wrapper}>
              <Header
                backButtonOnPress={() => setScreen(ScreenType.Register)}
              />
              <FormText text={t.Title} subText={t.SubText} />

              <Input
                textInputStyle={s.Input}
                placeholder={t.Code}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                keyboardType="phone-pad"
                maxLength={SMS_CODE_LENGTH}
                validationErrorText={codeError}
                onChangeText={(text) =>
                  processForm(null, null, null, null, text)
                }
                onEndEditing={() =>
                  setCodeError(isCodeValid ? "" : t.ValidationError.InvalidCode)
                }
              />

              <Button
                title={t.Button}
                onPress={() => Register()}
                style={s.Button}
                disabled={!isCodeValid}
              />
            </View>
          }
        />
      );
  }
}

const registerStyle = {
  Wrapper: {
    width: "90%",
  },
  Input: {
    marginTop: Sizes.Input.MarginTop,
  },
  PhoneInput: {
    Container: {
      marginTop: Sizes.Input.MarginTop,
      width: "100%",
      backgroundColor: Colors.Input.BackgroundColor,
      color: Colors.Input.Color,
      fontSize: Sizes.Input.FontSize,
      borderRadius: Sizes.Input.BorderRadius,
      borderWidth: Sizes.Input.BorderWidth,
      borderColor: Colors.Input.BorderColor,
    },
    TextContainer: {
      backgroundColor: Colors.Input.BackgroundColor,
      color: Colors.Input.Color,
    },
    TextInput: {
      color: Colors.Input.Color,
      backgroundColor: Colors.Input.BackgroundColor,
    },
    CodeText: {
      color: Colors.Input.Color,
    },
    FlagButton: {},
    CountryPickerButtonStyle: {},
  },
  Button: {
    marginTop: Sizes.Input.MarginTop * 2,
  },
  RestorePassword: {
    marginTop: Sizes.Input.MarginTop,
    display: "flex",
    alignItems: "flex-end",

    Text: {
      color: Colors.SubText,
      fontSize: 14,
      fontFamily: "SF-Medium",
    },
    Link: {
      fontWeight: "bold",
    },
  },
  EyeIcon: {
    color: Colors.White,
    textAlign: "right",
  },
  RegisterOffer: {
    marginTop: Sizes.Input.MarginTop * 2,
    display: "flex",
    alignItems: "center",

    Text: {
      color: Colors.SubText,
      fontSize: 14,
      fontFamily: "SF-Medium",
    },
    Link: {
      fontWeight: "bold",
    },
  },
};

const phoneConfirmationStyle = {
  Wrapper: {
    width: "90%",
  },
  Input: {
    marginTop: Sizes.Input.MarginTop * 2,
  },
  Button: {
    marginTop: Sizes.Input.MarginTop * 2,
  },
};
