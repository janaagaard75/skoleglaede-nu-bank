import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BrokeScreen } from "./BrokeScreen";
import { HomeScreen } from "./HomeScreen";
import { ResetScreen } from "./ResetScreen";
import { ScannerScreen } from "./ScannerScreen";
import { TransferScreen } from "./TransferScreen";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export type HomeStackParamList = {
  HomeScreen: undefined;
  BrokeScreen: undefined;
  ResetScreen: undefined;
  ScannerScreen: undefined;
  TransferScreen: undefined;
};

export const App = () => (
  <NavigationContainer>
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerBackTitle: "Tilbage",
        headerStyle: {
          backgroundColor: "#46a096",
        },
        headerTintColor: "#fff",
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Skoleglæde.nu Bank" }}
      />
      <HomeStack.Screen
        name="BrokeScreen"
        component={BrokeScreen}
        options={{ title: "Fallit" }}
      />
      <HomeStack.Screen
        name="ResetScreen"
        component={ResetScreen}
        options={{ title: "Nulstil" }}
      />
      <HomeStack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{ title: "Scan QR-kode" }}
      />
      <HomeStack.Screen
        name="TransferScreen"
        component={TransferScreen}
        options={{ title: "Overfør" }}
      />
    </HomeStack.Navigator>
  </NavigationContainer>
);
