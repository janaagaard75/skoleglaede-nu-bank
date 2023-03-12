import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Account } from "./Account";
import { HomeStackParamList } from "./App";
import { Button } from "./Button";

type Props = NativeStackScreenProps<HomeStackParamList, "HomeScreen"> & {
  credit: number;
  savings: number;
};

export const HomeScreen = (props: Props) => {
  const windowWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View
        style={{
          alignSelf: "flex-end",
          paddingRight: 20,
          paddingTop: 10,
        }}
      >
        <Button
          onPress={() => {
            props.navigation.navigate("ResetScreen");
          }}
          fontSize={13}
          title="Nulstil"
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      />
      <Account
        amount={props.credit}
        icon="credit-card"
        title="Konto"
        windowWidth={windowWidth}
      />
      <Account
        amount={props.savings}
        icon="bank"
        title="Opsparing"
        windowWidth={windowWidth}
      />
      <View
        style={{
          flex: 1,
        }}
      />
      <View
        style={{
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        <Button
          onPress={() => {
            props.navigation.navigate("BrokeScreen");
          }}
          fontSize={16}
          title="Fallit"
        />
      </View>
      <View
        style={{
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        <Button
          onPress={() => {
            props.navigation.navigate("TransferScreen");
          }}
          fontSize={16}
          title="Overfør til opsparing"
        />
      </View>
      <View
        style={{
          marginBottom: ifIphoneX(50, 30),
          paddingHorizontal: 20,
        }}
      >
        <Button
          onPress={() => {
            props.navigation.navigate("ScannerScreen");
          }}
          fontSize={16}
          title="Scan QR-kode"
        />
      </View>
    </View>
  );
};
