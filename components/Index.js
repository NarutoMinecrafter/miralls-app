import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  useNavigation,
} from "@react-navigation/native-stack";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import RestorePasswordScreen from "./RestorePasswordScreen";
import TabNavigation from "./TabNavigation";

import Preloader from "./Preloader";
import EditProfileScreen from "./EditProfileScreen";

import { setUserData } from "../redux/actions";
import { useDispatch } from "react-redux";
import { getUserData } from "./utils/user";

import PopUpMenu from "./PopUpMenu";

import { getTokens, isTokenExpired } from "./utils/jwt";

import _ from "./i18n";
import PostScreen from "./PostScreen";
import ArchiveScreen from "./ArchiveScreen";
import SearchScreen from "./SearchScreen";
import { Navigation } from "../constants";
import DialogsScreen from "./DialogsScreen";
import DialogScreen from "./DialogScreen";
import UserScreen from "./UserScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import WalletScreen from "./WalletScreen";
import SettingsScreen from "./SettingsScreen";

const Stack = createNativeStackNavigator();

export default function Index() {
  const dispatch = useDispatch();

  // Проверяем авторизацию
  const [initialRouteName, setInitialRouteName] = React.useState(null);
  const [me, setMe] = React.useState(null);

  React.useEffect(() => {
    async function checkAuthAndLoadUserData() {
      tokens = await getTokens();

      if (
        tokens &&
        !isTokenExpired(tokens.access) &&
        !isTokenExpired(tokens.refresh)
      ) {
        // Токены валидны
        if (me) return;
        userData = await getUserData();
        setMe(userData);
        console.log("Index.js user data loaded", userData);
        dispatch(setUserData(userData));
        setInitialRouteName(Navigation.TabNavigation);
      }

      // Токена нет или невалиден - экран авторизации
      else {
        setInitialRouteName(Navigation.Login);
      }
    }

    checkAuthAndLoadUserData();
  });

  if (!initialRouteName) {
    return <Preloader />;
  }

  return (
    <NavigationContainer>
      <PopUpMenu />
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name={Navigation.Login} component={LoginScreen} />

        <Stack.Screen name={Navigation.Register} component={RegisterScreen} />

        <Stack.Screen
          name={Navigation.RestorePassword}
          component={RestorePasswordScreen}
        />

        <Stack.Screen
          name={Navigation.TabNavigation}
          component={TabNavigation}
        />

        <Stack.Screen
          name={Navigation.EditProfile}
          component={EditProfileScreen}
        />

        <Stack.Screen name={Navigation.User} component={UserScreen} />

        <Stack.Screen name={Navigation.Dialogs} component={DialogsScreen} />
        <Stack.Screen name={Navigation.Dialog} component={DialogScreen} />

        <Stack.Screen name={Navigation.Archive} component={ArchiveScreen} />

        <Stack.Screen name={Navigation.Wallet} component={WalletScreen} />

        <Stack.Screen name={Navigation.Settings} component={SettingsScreen} />

        <Stack.Screen
          name={Navigation.ChangePassword}
          component={ChangePasswordScreen}
        />

        <Stack.Screen name={Navigation.Post} component={PostScreen} />

        <Stack.Screen name={Navigation.Search} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
