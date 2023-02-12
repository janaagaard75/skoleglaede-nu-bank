import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Component } from "react";
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

interface State {
  selectedTransfer: TransferAmount;
}

export class TransferScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTransfer: TransferAmount.None,
    };
  }

  private transfer() {
    Wallet.transferToSavings(this.state.selectedTransfer);
    this.props.navigation.goBack();
  }

  public render() {
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
            Vælg hvor mange penge du vil overføre fra din konto til din
            opsparing.
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
            onPress={() =>
              this.setState({
                selectedTransfer: TransferAmount.Transfer100,
              })
            }
            selectedTransfer={this.state.selectedTransfer}
          />
          <TransferAmountButton
            amount={TransferAmount.Transfer200}
            onPress={() =>
              this.setState({
                selectedTransfer: TransferAmount.Transfer200,
              })
            }
            selectedTransfer={this.state.selectedTransfer}
          />
          <TransferAmountButton
            amount={TransferAmount.Transfer500}
            onPress={() =>
              this.setState({
                selectedTransfer: TransferAmount.Transfer500,
              })
            }
            selectedTransfer={this.state.selectedTransfer}
          />
          <TransferAmountButton
            amount={TransferAmount.Transfer1000}
            onPress={() =>
              this.setState({
                selectedTransfer: TransferAmount.Transfer1000,
              })
            }
            selectedTransfer={this.state.selectedTransfer}
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
            disabled={this.state.selectedTransfer === TransferAmount.None}
            onTrigger={() => this.transfer()}
            title="Overfør"
          />
        </View>
      </View>
    );
  }
}

const TransferAmountButton = (props: {
  amount: TransferAmount;
  onPress: () => void;
  selectedTransfer: TransferAmount;
}) => {
  const enabled = Wallet.transferToSavingsAllowed(props.amount);

  return (
    <View
      style={{
        marginVertical: 5,
        width: "100%",
      }}
    >
      <Button
        disabled={!enabled}
        fontSize={16}
        onPress={props.onPress}
        selected={props.selectedTransfer === props.amount}
        title={Formatter.formatAsCurrency(props.amount)}
      />
    </View>
  );
};
