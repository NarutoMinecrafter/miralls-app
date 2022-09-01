import React from "react";
import { View } from "react-native";
import { Sizes, Colors, SMS_CODE_LENGTH } from "../constants";
import Input from "./Input";
import DefaultAuthForm from "./DefaultAuthForm";
import FormText from "./FormText";
import { APIRequest, getAccessToken } from "./utils/api";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import _ from "./i18n";
import Header from "./Header";
import * as FieldsValidator from "./utils/fieldsValidator";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Button, TextInput } from "@react-native-material/core";

const ScreenType = {
  PhoneNumber: 0,
  Code: 1,
  NewPassword: 2,
};

export default function RestorePasswordScreen({ navigation }) {
  var _t = _("RestorePassword");

  const [screen, setScreen] = React.useState(ScreenType.PhoneNumber);

  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = React.useState(false);
  const [phoneNumberError, setPhoneNumberError] = React.useState("");

  const [code, setCode] = React.useState(null);
  const [isCodeValid, setIsCodeValid] = React.useState(false);
  const [codeError, setCodeError] = React.useState("");

  const [password, setPassword] = React.useState(null);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");

  const [passwordAgain, setPasswordAgain] = React.useState(null);
  const [isPasswordAgainValid, setIsPasswordAgainValid] = React.useState(false);
  const [passwordAgainError, setPasswordAgainError] = React.useState("");

  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => {
        // Если экран сменился на другой
        if (!isFocused) {
          setScreen(ScreenType.PhoneNumber);

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
  function processForm(_phoneNumber, _code, _password, _passwordAgain) {
    if (_phoneNumber != null) {
      setPhoneNumber(_phoneNumber);
      var valid = FieldsValidator.isPhoneNumberValid(_phoneNumber);
      setIsPhoneNumberValid(valid);
      if (valid) setPhoneNumberError("");
    }
    if (_code != null) {
      setCode(_code);
      var valid = FieldsValidator.isCodeValid(_code);
      setIsCodeValid(valid);
      if (valid) setCodeError("");
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
  }

  async function PhoneVerification() {
    // Выполняем запрос
    const json = await APIRequest.post(
      "restore/phone/",
      {
        phone_number: phoneNumber,
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
        textBody: _t.Error[json.error_text].replace("{seconds}", seconds),
      });
    }
  }

  async function RestorePassword() {
    // Выполняем запрос
    const json = await APIRequest.post(
      "restore/",
      {
        phone_number: phoneNumber,
        password: password,
        password_again: passwordAgain,
        code: code,
      },
      false
    );

    if (!json) return;

    // Обрабатываем
    if (json.success) {
      if (password == null && passwordAgain == null) {
        setScreen(ScreenType.NewPassword);
      } else {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: _("Success"),
          textBody: _t.Success,
        });
        navigation.goBack();
      }
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: _("Error").Title,
        textBody: _t.Error[json.error_text],
      });
    }
  }

  switch (screen) {
    case ScreenType.PhoneNumber:
      var t = _t.PhoneNumber;

      return (
        <DefaultAuthForm
          withoutLogo={true}
          content={
            <View style={s.Wrapper}>
              <Header />

              <FormText text={t.Title} subText={t.SubText} />

              <Input
                wrapperStyle={s.Input}
                placeholder={t.PhoneNumber}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                textContentType="telephoneNumber"
                dataDetectorTypes="phoneNumber"
                keyboardType="phone-pad"
                maxLength={14}
                validationErrorText={phoneNumberError}
                onChangeText={(text) => processForm(text)}
                onEndEditing={() =>
                  setPhoneNumberError(
                    isPhoneNumberValid ? "" : _t.ValidationError.InvalidPhone
                  )
                }
                value={phoneNumber}
              />

              <Button
                title={t.Button}
                onPress={PhoneVerification}
                style={s.Button}
                disabled={!isPhoneNumberValid}
              />
            </View>
          }
        />
      );

    case ScreenType.Code:
      var t = _t.Code;

      return (
        <DefaultAuthForm
          withoutLogo={true}
          content={
            <View style={s.Wrapper}>
              <Header
                backButtonOnPress={() => {
                  setScreen(ScreenType.PhoneNumber);
                }}
              />

              <FormText text={t.Title} subText={t.SubText} />

              <Input
                textInputStyle={s.Input}
                placeholder={t.Code}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                keyboardType="phone-pad"
                maxLength={SMS_CODE_LENGTH}
                validationErrorText={codeError}
                onChangeText={(text) => processForm(null, text)}
                onEndEditing={() =>
                  setCodeError(
                    isCodeValid ? "" : _t.ValidationError.InvalidCode
                  )
                }
                value={null}
              />

              <Button
                title={t.Button}
                onPress={RestorePassword}
                style={s.Button}
                disabled={!isCodeValid}
              />
            </View>
          }
        />
      );

    case ScreenType.NewPassword:
      var t = _t.NewPassword;
      return (
        <DefaultAuthForm
          withoutLogo={true}
          content={
            <View style={s.Wrapper}>
              <Header
                backButtonOnPress={() => {
                  setPassword(null);
                  setPasswordAgain(null);
                  setScreen(ScreenType.PhoneNumber);
                }}
              />

              <FormText
                text={t.Title}
                subText={t.SubText}
                wrapperStyle={t.FormTextWrapper}
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
                    isPasswordValid ? "" : _t.ValidationError.InvalidPassword
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
                      : _t.ValidationError.InvalidPassword
                  )
                }
                value={passwordAgain}
              />

              <Button
                title={t.Button}
                onPress={RestorePassword}
                style={s.Button}
                disabled={
                  !(
                    isPasswordValid &&
                    isPasswordAgainValid &&
                    FieldsValidator.doPasswordsMatch(password, passwordAgain)
                  )
                }
              />
            </View>
          }
        />
      );
  }
}

const s = {
  Wrapper: {
    width: "90%",
  },
  FormTextWrapper: {
    marginBottom: Sizes.Input.MarginTop,
  },
  Input: {
    marginTop: Sizes.Input.MarginTop,
  },
  Button: {
    marginTop: Sizes.Input.MarginTop * 2,
  },
};
