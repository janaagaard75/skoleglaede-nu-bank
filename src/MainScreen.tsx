import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { NavigationScreenProps } from "react-navigation";
import { Button } from "./Button";
import { Formatter } from "./Formatter";
import { Wallet } from "./Wallet";

interface State {
  credit: number;
  savings: number;
  windowWidth: number;
}

export class MainScreen extends Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps) {
    super(props);

    this.state = {
      credit: Wallet.credit,
      savings: Wallet.savings,
      windowWidth: Dimensions.get("window").width,
    };

    // react-navigate doesn't allow sharing state between screens, and Wallet is not observable, so we are setting state manually when navigating back to this screen.
    this.props.navigation.addListener("willFocus", () => {
      this.setState({
        credit: Wallet.credit,
        savings: Wallet.savings,
      });
    });
  }

  public static navigationOptions = {
    title: "Skoleglæde.nu Bank",
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
            alignSelf: "flex-end",
            paddingRight: 20,
            paddingTop: 10,
          }}
        >
          <Button
            onPress={() => this.props.navigation.navigate("ResetScreen")}
            fontSize={13}
            title="Nulstil"
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        {this.renderAccount("credit-card", "Konto", this.state.credit)}
        {this.renderAccount("bank", "Opsparing", this.state.savings)}
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
            onPress={() => this.props.navigation.navigate("BrokeScreen")}
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
            onPress={() => this.props.navigation.navigate("TransferScreen")}
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
            onPress={() => this.props.navigation.navigate("ScannerScreen")}
            fontSize={16}
            title="Scan QR-kode"
          />
        </View>
      </View>
    );
  }

  private renderAccount(
    icon: string,
    title: string,
    amount: number
  ): JSX.Element {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FontAwesome
            style={{
              fontSize: 0.05 * this.state.windowWidth,
              marginRight: 5,
              width: 24,
            }}
            name={icon}
          />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 0.05 * this.state.windowWidth,
            }}
          >
            {title}
          </Text>
        </View>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 0.13 * this.state.windowWidth,
            paddingRight: 10,
          }}
        >
          {Formatter.formatAsCurrency(amount)}
        </Text>
      </View>
    );
  }
}
