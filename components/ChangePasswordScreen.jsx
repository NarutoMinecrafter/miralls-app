import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Sizes, Colors } from "../constants";
import DefaultScreen from "./DefaultScreen";
import Header from "./Header";
import Input from "./Input";
import _ from "./i18n";
import * as FieldsValidator from "./utils/fieldsValidator";
import { useTogglePasswordVisibility } from "./hooks/useTogglePasswordVisibility";

export default function ChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [oldPasswordEditing, setOldPasswordEditing] = useState(false);
  const [newPasswordEditing, setNewPasswordEditing] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const t = _("ChangePasswordScreen");

  function checkOldPassword() {
    const isValid = FieldsValidator.isPasswordValid(oldPassword)
      if (isValid) {
        if (oldPassword !== newPassword) {
          setOldPasswordError(t.ValidationError.PasswordsNotMatch)
        } else {
          setOldPasswordError('')
        }
    } else {
      setOldPasswordError(t.ValidationError.InvalidPassword)
    }
  }

  function checkNewPassword() {
    const isValid = FieldsValidator.isPasswordValid(newPassword)
    if (isValid) {
      if (newPassword !== oldPassword) {
        setNewPasswordError(t.ValidationError.PasswordsNotMatch)
      } else {
        setNewPasswordError('')
      }
    } else {
      setNewPasswordError(t.ValidationError.InvalidPassword)
    }
  }

  useEffect(() => {
    if (oldPasswordEditing) {
      checkOldPassword()
    }
    if (newPasswordEditing) {
      checkNewPassword()
    }
  }, [oldPasswordEditing, newPasswordEditing, oldPassword, newPassword])

  function ChangePassword() {
    console.log('ChangePassword')
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
                passwordVisibilityProps={passwordVisibility}
                rightIconProps={rightIcon}
                handlePasswordVisibilityProps={handlePasswordVisibility}
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
