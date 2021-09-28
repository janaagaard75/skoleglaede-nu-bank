import * as React from "react";
import { Component } from "react";
import { Text, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { NavigationScreenProps } from "react-navigation";
import { SlideButton } from "./SlideButton";
import { Wallet } from "./Wallet";

export class ResetScreen extends Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props);
  }

  public static navigationOptions = {
    title: "Nulstil",
  };

  public render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Nulstil din konto til 4.000 kroner og din opsparing til 0 kroner?
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
            }}
          >
            Denne handling kan ikke fortrydes.
          </Text>
        </View>
        <View
          style={{
            marginBottom: ifIphoneX(50, 30),
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <SlideButton onTrigger={() => this.resetWallet()} title="Nulstil" />
        </View>
      </View>
    );
  }

  private resetWallet() {
    Wallet.reset();
    this.props.navigation.goBack();
  }
}
