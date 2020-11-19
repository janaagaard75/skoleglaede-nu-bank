import * as React from "react";
import { Component } from "react";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { NavigationScreenProps } from "react-navigation";
import { Text } from "react-native";
import { View } from "react-native";

import { SlideButton } from "./SlideButton";
import { Wallet } from "./Wallet";

export class BrokeScreen extends Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context);
  }

  public static navigationOptions = {
    title: "Fallit"
  };

  public render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 10
          }}
        >
          <Text
            style={{
              fontSize: 16
            }}
          >
            Nulstil din konto til 0,00 kroner? Din opsparing ændres ikke.
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10
            }}
          >
            Denne handling kan ikke fortrydes.
          </Text>
        </View>
        <View
          style={{
            marginBottom: ifIphoneX(50, 30),
            paddingHorizontal: 20,
            width: "100%"
          }}
        >
          <SlideButton onTrigger={() => this.broke()} title="Fallit" />
        </View>
      </View>
    );
  }

  private broke() {
    Wallet.broke();
    this.props.navigation.goBack();
  }
}
