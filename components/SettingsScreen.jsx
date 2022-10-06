import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Sizes, Colors } from "../constants";
import DefaultScreen from "./DefaultScreen";
import Header from "./Header";
import Input from "./Input";
import _ from "./i18n";
import I18n from "i18n-js";
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen({ navigation }) {
  const [language, setLanguage] = useState(I18n.locale || '');

  function handleLanguageChange(newLanguage) {
    console.log('language', newLanguage)
    console.log('I18n.locale', I18n.locale)
    I18n.locale = newLanguage
    SecureStore.setItemAsync('language', newLanguage)
    setLanguage(newLanguage)
  }

  // Локализация
  const t = _("SettingsScreen");
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
              <Input style={s.Input} label={t.Language} value={language} onChangeText={handleLanguageChange} picker>
                <Picker.Item label={t.Languages.RU} value={'ru'} />
                <Picker.Item label={t.Languages.UA} value={'ua'} />
                <Picker.Item label={t.Languages.EN} value={'en'} />
              </Input>
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
  Input: {
    backgroundColor: Colors.Input.BackgroundColor,
    color: Colors.Input.Color,
    paddingVertical: Sizes.Input.PaddingVertical,
    paddingHorizontal: Sizes.Input.PaddingHorizontal,
    fontSize: Sizes.Input.FontSize,
    borderRadius: Sizes.Input.BorderRadius,
    borderWidth: Sizes.Input.BorderWidth,
    borderColor: Colors.Input.BorderColor,
  },
};
