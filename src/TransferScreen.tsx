import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { HomeStackParamList } from "./App";
import { Button } from "./Button";
import { Formatter } from "./Formatter";
import { SlideButton } from "./SlideButton";
import { Wallet } from "./Wallet";

type Props = NativeStackScreenProps<HomeStackParamList, "TransferScreen">;

enum TransferAmount {
  None = 0,
  Transfer100 = 100,
  Transfer200 = 200,
  Transfer500 = 500,
  Transfer1000 = 1000,
  TransferCustom = -1,
}

export const TransferScreen = (props: Props) => {
  const [selectedTransfer, setSelectedTransfer] = useState(TransferAmount.None);

  const transfer = () => {
    Wallet.transferToSavings(selectedTransfer);
    props.navigation.goBack();
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 30,
        }}
      >
        <Text>
          Vælg hvor mange penge du vil overføre fra din konto til din opsparing.
        </Text>
        <Text style={{ marginTop: 15 }}>
          Konto: {Formatter.formatAsCurrency(Wallet.credit)}
        </Text>
        <Text style={{ marginTop: 5 }}>
          Opsparing: {Formatter.formatAsCurrency(Wallet.savings)}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          alignSelf: "center",
          flex: 1,
          justifyContent: "center",
          width: "50%",
        }}
      >
        {[
          TransferAmount.Transfer100,
          TransferAmount.Transfer200,
          TransferAmount.Transfer500,
          TransferAmount.Transfer1000,
        ].map((amount) => (
          <TransferAmountButton
            amount={amount}
            enabled={Wallet.transferToSavingsAllowed(amount)}
            key={amount}
            onPress={() => {
              setSelectedTransfer(amount);
            }}
            selected={selectedTransfer === amount}
          />
        ))}
      </View>
      <View
        style={{
          marginBottom: ifIphoneX(50, 30),
          paddingHorizontal: 20,
          width: "100%",
        }}
      >
        <SlideButton
          disabled={selectedTransfer === TransferAmount.None}
          onTrigger={transfer}
          title="Overfør"
        />
      </View>
    </View>
  );
};

const TransferAmountButton = (props: {
  amount: TransferAmount;
  enabled: boolean;
  onPress: () => void;
  selected: boolean;
}) => (
  <View
    style={{
      marginVertical: 5,
      width: "100%",
    }}
  >
    <Button
      disabled={!props.enabled}
      fontSize={16}
      onPress={props.onPress}
      selected={props.selected}
      title={Formatter.formatAsCurrency(props.amount)}
    />
  </View>
);
