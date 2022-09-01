import React from "react";
import { useFonts } from "expo-font";
import { Root } from "react-native-alert-notification";
import i18n from "i18n-js";
import Preloader from "./components/Preloader";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import Index from "./components/Index";
import { LogBox } from "react-native";
import {
  IconButton,
  TextInput,
  ThemeProvider,
  useTheme,
} from "@react-native-material/core";
import { Colors } from "./constants";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  'Each child in a list should have a unique "key"',
  // 'Can\'t perform a React state update on an unmounted component.'
]);

export default function App() {
  i18n.locale = "ru";

  // Загружаем шрифты
  const [loaded] = useFonts({
    "SF-Thin": require("./assets/fonts/SF-Pro-Rounded-Thin.otf"),
    "SF-Light": require("./assets/fonts/SF-Pro-Rounded-Light.otf"),
    "SF-Regular": require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "SF-Medium": require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
    "SF-Bold": require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
  });

  const theme = useTheme();
  const newTheme = {
    ...theme,
    palette: {
      ...theme.palette,
      primary: {
        main: Colors.White,
        on: theme.palette.primary.on,
      },
    },
  };

  if (!loaded) return <Preloader />;

  return (
    <Provider store={Store}>
      <ThemeProvider theme={newTheme}>
        <Root theme="dark" toastConfig={{ autoClose: 3000 }}>
          <Index />
        </Root>
      </ThemeProvider>
    </Provider>
  );
}
