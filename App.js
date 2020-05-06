import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Bills from "./Bills";
import Home from "./Home";

const AppNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home },

    Bills: { screen: Bills },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Home") {
          return <Ionicons name="md-home" size={25} color={tintColor} />;
        } else if (routeName === "Bills") {
          return <Ionicons name="md-cash" size={25} color={tintColor} />;
        }
      },
    }),
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default function App() {
  return <AppContainer />;
}
