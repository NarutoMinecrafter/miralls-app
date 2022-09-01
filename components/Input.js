import React from "react";
import { Colors } from "../constants";
import { useTogglePasswordVisibility } from "./hooks/useTogglePasswordVisibility";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  IconButton,
  TextInput,
  ThemeProvider,
  useTheme,
} from "@react-native-material/core";

export default function Input({
  name,
  placeholder,
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
  multiline = true,
  label,
  validationError = false,
  validationErrorText,
  textInputStyle,
  wrapperStyle,
}) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [textInputValue, setTextInputValue] = React.useState(value);
  const theme = useTheme();

  const newTheme = {
    ...theme,
    palette: {
      ...theme.palette,
      surface: {
        main: theme.palette.surface.main,
        on:
          validationError || validationErrorText
            ? Colors.Input.ValidationError.Color
            : theme.palette.surface.on,
      },
    },
  };

  const styles = {
    backgroundColor: "black",
    color:
      validationError || validationErrorText
        ? Colors.Input.ValidationError.Color
        : Colors.White,
  };

  if (value != textInputValue) setTextInputValue(value);

  return (
    <ThemeProvider theme={newTheme}>
      <TextInput
        style={[wrapperStyle, styles]}
        inputContainerStyle={styles}
        inputStyle={[textInputStyle, styles]}
        name={name}
        label={placeholder || label}
        variant="outlined"
        color={validationError || validationErrorText ? "error" : "primary"}
        helperText={validationErrorText}
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
        trailing={
          passwordVisiblityButton
            ? (props) => (
                <IconButton
                  onPress={handlePasswordVisibility}
                  icon={(props) => (
                    <MaterialCommunityIcons
                      name={rightIcon}
                      size={22}
                      color={Colors.White}
                    />
                  )}
                  {...props}
                />
              )
            : undefined
        }
      ></TextInput>
    </ThemeProvider>
  );
}
