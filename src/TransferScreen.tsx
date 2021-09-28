import * as React from "react";
import { Component } from "react";
import { Text, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { NavigationScreenProps } from "react-navigation";
import { Button } from "./Button";
import { Formatter } from "./Formatter";
import { SlideButton } from "./SlideButton";
import { Wallet } from "./Wallet";

enum TransferAmount {
  None = 0,
  Transfer200 = 200,
  Transfer500 = 500,
  Transfer1000 = 1000,
}

interface State {
  selectedTransfer: TransferAmount;
}

export class TransferScreen extends Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps) {
    super(props);

    this.state = {
      selectedTransfer: TransferAmount.None,
    };
  }

  public static navigationOptions = {
    title: "Overfør",
  };

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
          {this.renderTransferAmount(TransferAmount.Transfer200)}
          {this.renderTransferAmount(TransferAmount.Transfer500)}
          {this.renderTransferAmount(TransferAmount.Transfer1000)}
        </View>
        <View
          style={{
            marginBottom: ifIphoneX(50, 30),
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <SlideButton onTrigger={() => this.transfer()} title="Overfør" />
        </View>
      </View>
    );
  }

  private renderTransferAmount(amount: TransferAmount) {
    const enabled = Wallet.transferToSavingsAllowed(amount);

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
          onPress={() => this.setState({ selectedTransfer: amount })}
          selected={this.state.selectedTransfer === amount}
          title={Formatter.formatAsCurrency(amount)}
        />
      </View>
    );
  }

  private transfer() {
    Wallet.transferToSavings(this.state.selectedTransfer);
    this.props.navigation.goBack();
  }
}
