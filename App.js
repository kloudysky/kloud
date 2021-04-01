import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginComponent from "./views/LoginComponent";
import RegisterComponent from "./views/RegisterComponent";
import HomeComponent from "./views/HomeComponent";
import AddChatComponent from "./views/AddChatComponent";
import ChatComponent from "./views/ChatComponent";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const globalScreenOptions = {
  // headerStyle: { backgroundColor: "#E08D3A" },
  headerStyle: { backgroundColor: "#2c2f33" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        //initialRouteName="Home"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Register" component={RegisterComponent} />
        <Stack.Screen name="Home" component={HomeComponent} />
        <Stack.Screen name="AddChat" component={AddChatComponent} />
        <Stack.Screen name="Chat" component={ChatComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
