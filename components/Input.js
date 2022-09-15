import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { Sizes, Colors } from "../constants";
import { useTogglePasswordVisibility } from "./hooks/useTogglePasswordVisibility";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Input({
  name,
  placeholder,
  placeholderTextColor,
  passwordVisiblityButton = false,
  secureTextEntry,
  textContentType,
  dataDetectorTypes,
  keyboardType,
  maxLength,
  onFocus,
  onChange,
  onChangeText,
  onEndEditing,
  value,
  multiline = false,
  label,
  validationError = false,
  validationErrorText,
  textInputStyle,
  wrapperStyle,
}) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [textInputValue, setTextInputValue] = React.useState(value);

  if (value != textInputValue) setTextInputValue(value);

  return (
    <View style={[wrapperStyle]}>
      {label ? (
        <Text
          style={[
            style.Label,
            validationError || validationErrorText
              ? style.LabelValidationError
              : null,
          ]}
        >
          {label}
        </Text>
      ) : null}

      <TextInput
        style={[
          style.TextInput,
          textInputStyle,
          validationError || validationErrorText
            ? style.TextInputValidationError
            : null,
        ]}
        name={name}
        placeholder={placeholder}
        placeholderTextColor={
          validationError || validationErrorText
            ? Colors.Input.ValidationError.PlaceholderTextColor
            : placeholderTextColor
        }
        secureTextEntry={
          passwordVisiblityButton ? passwordVisibility : secureTextEntry
        }
        textContentType={textContentType}
        dataDetectorTypes={dataDetectorTypes}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onChange={onChange}
        onChangeText={(text) => {
          setTextInputValue(text);
          onChangeText(text);
        }}
        onFocus={onFocus}
        onEndEditing={onEndEditing}
        value={textInputValue}
        multiline={multiline}
      ></TextInput>
      {passwordVisiblityButton ? (
        <View style={pressableWrapperStyle}>
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons
              name={rightIcon}
              size={22}
              color={Colors.White}
            />
          </Pressable>
        </View>
      ) : (
        <></>
      )}
      {validationErrorText && (
        <Text style={style.ErrorText}>{validationErrorText}</Text>
      )}
    </View>
  );
}

const style = {
  TextInput: {
    backgroundColor: Colors.Input.BackgroundColor,
    color: Colors.Input.Color,
    paddingVertical: Sizes.Input.PaddingVertical,
    paddingHorizontal: Sizes.Input.PaddingHorizontal,
    fontSize: Sizes.Input.FontSize,
    borderRadius: Sizes.Input.BorderRadius,
    borderWidth: Sizes.Input.BorderWidth,
    borderColor: Colors.Input.BorderColor,
  },
  TextInputValidationError: {
    borderColor: Colors.Input.ValidationError.BorderColor,
    color: Colors.Input.ValidationError.Color,
  },
  Label: {
    color: Colors.InputLabel.Color,
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: "SF-Regular",
    fontSize: 16,
  },
  LabelValidationError: {
    color: Colors.InputLabel.ValidationError.Color,
  },
  ErrorText: {
    color: Colors.InputLabel.ValidationError.Color,
  },
};

const pressableWrapperStyle = {
  display: "flex",
  alignItems: "center",
  position: "absolute",
  right: 15,
  // backgroundColor: 'red',
  top: Sizes.Input.MarginTop + 6,
  height: "100%",
};
