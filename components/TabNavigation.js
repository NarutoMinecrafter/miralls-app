import React, { useState, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Octicons } from "@expo/vector-icons";
import { Sizes, Colors, Navigation } from "../constants";
import FeedScreen from "./FeedScreen";
import AddPostScreen from "./AddPostScreen";
import NotificationsScreen from "./NotificationsScreen";
import ProfileScreen from "./ProfileScreen";
import Preloader from "./Preloader";

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName={Navigation.Tabs.Profile}
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      barStyle={s.TabBar}
      labeled={false}
    >
      <Tab.Screen
        name={Navigation.Tabs.Feed}
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={Navigation.Tabs.AddPost}
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="diff-added" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={Navigation.Tabs.Notifications}
        component={NotificationsScreen}
        options={{
          tabBarBadge: true,
          tabBarIcon: ({ color }) => (
            <Octicons name="heart" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={Navigation.Tabs.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const s = {
  TabBar: {
    backgroundColor: Colors.BG,
    height: Sizes.Menu.Height,
  },
};
