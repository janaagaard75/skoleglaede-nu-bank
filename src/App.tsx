import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BrokeScreen } from "./BrokeScreen";
import { HomeScreen } from "./HomeScreen";
import { ResetScreen } from "./ResetScreen";
import { ScannerScreen } from "./ScannerScreen";
import { TransferScreen } from "./TransferScreen";

export type HomeStackParamList = {
  HomeScreen: undefined;
  BrokeScreen: undefined;
  ResetScreen: undefined;
  ScannerScreen: undefined;
  TransferScreen: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

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
        options={{ title: "Skoleglæde.nu Bank" }}
      >
        {(props) => <HomeScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="BrokeScreen" options={{ title: "Fallit" }}>
        {(props) => <BrokeScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="ResetScreen" options={{ title: "Nulstil" }}>
        {(props) => <ResetScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="ScannerScreen"
        options={{ title: "Scan QR-kode" }}
      >
        {(props) => <ScannerScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="TransferScreen" options={{ title: "Overfør" }}>
        {(props) => <TransferScreen {...props} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  </NavigationContainer>
);
