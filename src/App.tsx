import { createAppContainer, createStackNavigator } from "react-navigation";
import { BrokeScreen } from "./BrokeScreen";
import { MainScreen } from "./MainScreen";
import { ResetScreen } from "./ResetScreen";
import { ScannerScreen } from "./ScannerScreen";
import { TransferScreen } from "./TransferScreen";

const getSubScreen = (screen: any) => {
  return {
    navigationOptions: () => ({
      headerBackTitleStyle: {
        color: "#fff",
      },
      headerStyle: {
        backgroundColor: "#46a096",
        borderBottomColor: "#387f77",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    }),
    screen: screen,
  };
};

const mainNavigator = createStackNavigator({
  MainScreen: {
    navigationOptions: () => ({
      headerBackTitle: "Tilbage",
      headerStyle: {
        backgroundColor: "#46a096",
        borderBottomColor: "#387f77",
      },
      headerTitleStyle: {
        color: "#fff",
      },
    }),
    screen: MainScreen,
  },
  // tslint:disable-next-line:object-literal-sort-keys
  BrokeScreen: getSubScreen(BrokeScreen),
  ResetScreen: getSubScreen(ResetScreen),
  ScannerScreen: getSubScreen(ScannerScreen),
  TransferScreen: getSubScreen(TransferScreen),
});

export default createAppContainer(mainNavigator);
