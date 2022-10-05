import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Sizes, Colors } from "../constants";
import DefaultScreen from "./DefaultScreen";
import Header from "./Header";
import Input from "./Input";
import _ from "./i18n";
import * as FieldsValidator from "./utils/fieldsValidator";
import { useTogglePasswordVisibility } from "./hooks/useTogglePasswordVisibility";
import { APIRequest } from "./utils/api";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function ChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordAgain, setNewPasswordAgain] = useState();
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordAgainError, setNewPasswordAgainError] = useState(false);
  const [oldPasswordEditing, setOldPasswordEditing] = useState(false);
  const [newPasswordEditing, setNewPasswordEditing] = useState(false);
  const [newPasswordAgainEditing, setNewPasswordAgainEditing] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const t = _("ChangePasswordScreen");

  function checkOldPassword() {
    const isValid = FieldsValidator.isPasswordValid(oldPassword)
      if (isValid) {
        setOldPasswordError('')
    } else {
      setOldPasswordError(t.ValidationError.InvalidPassword)
    }
  }

  function checkNewPassword() {
    const isValid = FieldsValidator.isPasswordValid(newPassword)
    if (isValid) {
      if (newPassword !== newPasswordAgain) {
        setNewPasswordError(t.ValidationError.PasswordsNotMatch)
      } else {
        setNewPasswordError('')
      }
    } else {
      setNewPasswordError(t.ValidationError.InvalidPassword)
    }
  }

  function checkNewPasswordAgain() {
    const isValid = FieldsValidator.isPasswordValid(newPasswordAgain)
    if (isValid) {
      if (newPasswordAgain !== newPassword) {
        setNewPasswordAgainError(t.ValidationError.PasswordsNotMatch)
      } else {
        setNewPasswordAgainError('')
      }
    } else {
      setNewPasswordAgainError(t.ValidationError.InvalidPassword)
    }
  }

  useEffect(() => {
    if (oldPasswordEditing) {
      checkOldPassword()
    }
    if (newPasswordEditing) {
      checkNewPassword()
    }
    if (newPasswordAgainEditing) {
      checkNewPasswordAgain()
    }
  }, [oldPasswordEditing, newPasswordEditing, newPasswordAgainEditing, oldPassword, newPassword, newPasswordAgain])

  async function ChangePassword() {
    const response = await APIRequest.post('changepassword', {
      old_password: oldPassword,
      new_password: newPassword,
      new_password_again: newPasswordAgain
    })

    if (response && response.success) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: _("Success"),
      });

      navigation.goBack()
    } else if (response.error_text){
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: response.error_text || _('Error').SERVER_ERROR,
      });
    }
  }

  return (
    <DefaultScreen
      content={
        <View style={s.Wrapper}>
          <Header
            title={t.Title}
            rightButton={true}
            rightButtonOnPress={() => {
              ChangePassword();
            }}
          />
          <ScrollView>
            <View style={s.Fields}>
              <Input
                label={t.OldPassword}
                placeholder={t.OldPassword}
                value={oldPassword}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                onChangeText={setOldPassword}
                validationErrorText={oldPasswordError}
                onEndEditing={() => setOldPasswordEditing(true)}
                passwordVisiblityButton
              />
              <Input
                wrapperStyle={s.Input}
                label={t.NewPassword}
                placeholder={t.NewPassword}
                value={newPassword}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                onChangeText={setNewPassword}
                validationErrorText={newPasswordError}
                onEndEditing={() => setNewPasswordEditing(true)}
                passwordVisiblityButton
                passwordVisibilityProps={passwordVisibility}
                rightIconProps={rightIcon}
                handlePasswordVisibilityProps={handlePasswordVisibility}
              />
              <Input
                wrapperStyle={s.Input}
                label={t.NewPasswordAgain}
                placeholder={t.NewPasswordAgain}
                value={newPasswordAgain}
                placeholderTextColor={Colors.Input.PlaceholderTextColor}
                onChangeText={setNewPasswordAgain}
                validationErrorText={newPasswordAgainError}
                onEndEditing={() => setNewPasswordAgainEditing(true)}
                passwordVisiblityButton
                passwordVisibilityProps={passwordVisibility}
                rightIconProps={rightIcon}
                handlePasswordVisibilityProps={handlePasswordVisibility}
              />
            </View>
          </ScrollView>
        </View>
      }
    />
  );
}

const s = {
  Wrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    padding: Sizes.Screen.Padding,
  },
  Fields: {
    marginBottom: 16,
  },
  Picture: {
    Wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    View: {
      display: "flex",
      alignItems: "center",
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
      fontFamily: "SF-Regular",
      fontSize: 16,
      textAlign: "center",
    },
  },
  Input: {
    marginTop: Sizes.Input.MarginTop,
  },
  LogOutButton: {
    position: "absolute",
    width: "100%",
    bottom: Sizes.Screen.Padding,
    left: Sizes.Screen.Padding,
  },
};
