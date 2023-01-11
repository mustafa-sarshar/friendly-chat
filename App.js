import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

// import the screens we want to navigate
import Start from "./src/screens/start";
import User from "./src/screens/user";
import Chat from "./src/screens/chat";
import Stack from "./src/components/stack";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  `Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead`,
  "Cannot connect to Metro",
  "Non-serializable values were found in the navigation state",
]);

class App extends Component {
  render = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen
            name="User"
            component={User}
            options={{ title: "User Profile" }}
          />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  };
}

export default App;
