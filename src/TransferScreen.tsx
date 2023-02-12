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
        <TransferAmountButton
          amount={TransferAmount.Transfer100}
          enabled={Wallet.transferToSavingsAllowed(TransferAmount.Transfer100)}
          onPress={() => setSelectedTransfer(TransferAmount.Transfer100)}
          selected={selectedTransfer === TransferAmount.Transfer100}
        />
        <TransferAmountButton
          amount={TransferAmount.Transfer200}
          enabled={Wallet.transferToSavingsAllowed(TransferAmount.Transfer200)}
          onPress={() => setSelectedTransfer(TransferAmount.Transfer200)}
          selected={selectedTransfer === TransferAmount.Transfer200}
        />
        <TransferAmountButton
          amount={TransferAmount.Transfer500}
          enabled={Wallet.transferToSavingsAllowed(TransferAmount.Transfer500)}
          onPress={() => setSelectedTransfer(TransferAmount.Transfer500)}
          selected={selectedTransfer === TransferAmount.Transfer500}
        />
        <TransferAmountButton
          amount={TransferAmount.Transfer1000}
          enabled={Wallet.transferToSavingsAllowed(TransferAmount.Transfer1000)}
          onPress={() => setSelectedTransfer(TransferAmount.Transfer1000)}
          selected={selectedTransfer === TransferAmount.Transfer1000}
        />
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
