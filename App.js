import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

// import the screens we want to navigate
import Start from "./src/screens/start";
import Chat from "./src/screens/chat";
import Stack from "./src/components/stack";

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
}

export default App;
