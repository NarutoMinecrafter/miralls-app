import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { Sizes, Colors } from "../constants";
import { useTogglePasswordVisibility } from "./hooks/useTogglePasswordVisibility";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function Input({
  picker,
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
  passwordVisibilityProps = null,
  rightIconProps = null,
  handlePasswordVisibilityProps = null,
  children,
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

      <View>
        {picker ? (
          <Picker
            dropdownIconColor={"#eee"}
            selectedValue={value}
            onValueChange={(itemValue) => onChangeText(itemValue)}
            style={[
              style.TextInput,
              textInputStyle,
              validationError || validationErrorText
                ? style.TextInputValidationError
                : null,
            ]}
          >
            {children}
          </Picker>
        ) : (
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
              passwordVisiblityButton
                ? passwordVisibilityProps === null
                  ? passwordVisibility
                  : passwordVisibilityProps
                : secureTextEntry
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
          />
        )}
        {passwordVisiblityButton ? (
          <View style={style.PressableWrapperStyle}>
            <Pressable
              onPress={
                handlePasswordVisibilityProps === null
                  ? handlePasswordVisibility
                  : handlePasswordVisibilityProps
              }
            >
              <MaterialCommunityIcons
                name={rightIconProps === null ? rightIcon : rightIconProps}
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
  PressableWrapperStyle: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: 15,
    // backgroundColor: 'red',
    top: Sizes.Input.MarginTop + 6,
    height: "100%",
  },
};
