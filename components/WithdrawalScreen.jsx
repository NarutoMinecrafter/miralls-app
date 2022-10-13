import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Sizes, Colors } from "../constants";
import DefaultScreen from "./DefaultScreen";
import Header from "./Header";
import Input from "./Input";
import _ from "./i18n";
import { Button } from "@react-native-material/core";

export default function WithdrawalScreen({ navigation }) {
  const [method, setMethod] = useState('Visa');
  const [credentials, setCredentials] = useState('');
  const [sum, setSum] = useState('0');

  // Локализация
  const t = _("WithdrawalScreen");
  return (
    <DefaultScreen
      content={
        <View style={s.Wrapper}>
          <Header
            title={t.Title}
          />
          <ScrollView>
            <View style={s.Fields}>
              <Input style={s.Input} label={t.Method} value={method} onChangeText={text => setMethod(text)} picker>
                <Picker.Item label="Visa" value="Visa" />
                <Picker.Item label="MasterCard" value="MasterCard" />
                <Picker.Item label="PayPal" value="PayPal" />
              </Input>
              <Input style={s.Input} label={t.Credentials} value={credentials} onChangeText={text => setCredentials(text)} />
              <Input style={s.Input} label={t.Sum} value={sum} keyboardType="numeric" onChangeText={text => setSum(text)} />
              <Button style={s.Button} title={t.Button} />
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
  Button: {
    marginTop: 10
  }
};
