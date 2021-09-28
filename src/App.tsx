import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { BrokeScreen } from "./BrokeScreen";
import { MainScreen } from "./MainScreen";
import { ResetScreen } from "./ResetScreen";
import { ScannerScreen } from "./ScannerScreen";
import { TransferScreen } from "./TransferScreen";

const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
  HomeScreen: undefined;
  BrokeScreen: undefined;
  ResetScreen: undefined;
  ScannerScreen: undefined;
  TransferScreen: undefined;
};

export const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerBackTitle: "Tilbage",
        headerStyle: {
          backgroundColor: "#46a096",
        },
        headerTintColor: "#fff",
      }}
    >
      {/* TODO: Rename to HomeScreen. */}
      <Stack.Screen
        name="HomeScreen"
        component={MainScreen}
        options={{ title: "Skoleglæde.nu Bank" }}
      />
      <Stack.Screen
        name="BrokeScreen"
        component={BrokeScreen}
        options={{ title: "Fallit" }}
      />
      <Stack.Screen
        name="ResetScreen"
        component={ResetScreen}
        options={{ title: "Nulstil" }}
      />
      <Stack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{ title: "Scan QR-kode" }}
      />
      <Stack.Screen
        name="TransferScreen"
        component={TransferScreen}
        options={{ title: "Overfør" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
