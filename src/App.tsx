import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BrokeScreen } from "./BrokeScreen";
import { HomeScreen } from "./HomeScreen";
import { ResetScreen } from "./ResetScreen";
import { ScannerScreen } from "./ScannerScreen";
import { TransferScreen } from "./TransferScreen";
import { useWallet } from "./useWallet";

export type HomeStackParamList = {
  BrokeScreen: undefined;
  HomeScreen: undefined;
  ResetScreen: undefined;
  ScannerScreen: undefined;
  TransferScreen: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const App = () => {
  const [
    credit,
    savings,
    broke,
    performAction,
    reset,
    transferToSavings,
    transferToSavingsAllowed,
  ] = useWallet();

  return (
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
          {(props) => (
            <HomeScreen credit={credit} savings={savings} {...props} />
          )}
        </HomeStack.Screen>
        <HomeStack.Screen
          name="BrokeScreen"
          options={{
            title: "Fallit",
          }}
        >
          {(props) => <BrokeScreen onBrokeButtonSlide={broke} {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen
          name="ResetScreen"
          options={{
            title: "Nulstil",
          }}
        >
          {(props) => <ResetScreen onResetButtonSlide={reset} {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen
          name="ScannerScreen"
          options={{ title: "Scan QR-kode" }}
        >
          {(props) => (
            <ScannerScreen okButtonSlide={performAction} {...props} />
          )}
        </HomeStack.Screen>
        <HomeStack.Screen
          name="TransferScreen"
          options={{
            title: "Overfør",
          }}
        >
          {(props) => (
            <TransferScreen
              credit={credit}
              onTransferToSavings={transferToSavings}
              savings={savings}
              transferToSavingsAllowed={transferToSavingsAllowed}
              {...props}
            />
          )}
        </HomeStack.Screen>
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};
