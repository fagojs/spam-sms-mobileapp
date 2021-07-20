import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import AppStatusBar from "./components/AppStatusBar";
import Messages from "./components/Messages";
import SpamMessage from "./components/SpamMessage";
import MessageDetails from "./components/MessageDetails";
import TestMessage from "./components/TestMessage";
import { white, orange } from "./utils/color";

const TabNav = createMaterialTopTabNavigator(
  {
    Messages: { screen: Messages },
    SpamMessage: { screen: SpamMessage }
  },
  {
    navigationOptions: { header: null },
    tabBarOptions: {
      showIcon: true,
      activeTintColor: white,
      upperCaseLabel: false,
      labelStyle: { fontSize: 16, fontWeight: "bold" },
      style: {
        height: 65,
        backgroundColor: orange
      }
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: { screen: TabNav },
    MessageDetails: { screen: MessageDetails },
    TestMessage: { screen: TestMessage }
  },
  {
    initialRouteName: "Home"
  }
);
const AppContainer = createAppContainer(AppNavigator);
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppStatusBar backgroundColor={orange} barStyle="light-content" />
      <AppContainer />
    </View>
  );
}
