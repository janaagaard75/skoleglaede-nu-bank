import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Action } from "./actions/Action";
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

export const App = () => {
  const [credit, setCredit] = useState(4_000);
  const [savings, setSavings] = useState(0);
  const key = "wallet";

  const broke = async () => {
    setCredit(0);
    await save();
  };

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const walletString = await SecureStore.getItemAsync(key);
      if (walletString === null) {
        reset();
        return;
      }

      const wallet = JSON.parse(walletString);
      setCredit(wallet.credit);
      setSavings(wallet.savings);
    } catch {
      reset();
    }
  };

  const performAction = async (action: Action) => {
    setCredit(action.performAction(credit));
    await save();
  };

  const reset = async () => {
    setCredit(4_000);
    setSavings(0);
    await save();
  };

  const save = async () => {
    const walletString = JSON.stringify({
      credit: credit,
      savings: savings,
    });
    await SecureStore.setItemAsync(key, walletString);
  };

  const transferToSavings = async (amount: number) => {
    setCredit(credit - amount);
    setSavings(savings + amount);
    await save();
  };

  const transferToSavingsAllowed = (amount: number) => {
    return credit >= amount;
  };

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
        <HomeStack.Screen name="BrokeScreen" options={{ title: "Fallit" }}>
          {(props) => <BrokeScreen onBrokeButtonSlide={broke} {...props} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="ResetScreen" options={{ title: "Nulstil" }}>
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
        <HomeStack.Screen name="TransferScreen" options={{ title: "Overfør" }}>
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
