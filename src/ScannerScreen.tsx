import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import * as React from "react";
import { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { NavigationScreenProps } from "react-navigation";
import { Action } from "./actions/Action";
import { QrCodeParser } from "./actions/QrCodeParser";
import { SlideButton } from "./SlideButton";
import { Wallet } from "./Wallet";


enum PermissionState {
  Requesting,
  Denied,
  Granted
}

interface State {
  cameraPermission: PermissionState;
  codeScanned: boolean;
  currentAction: Action | undefined;
  windowWidth: number;
}

export class ScannerScreen extends Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps, context?: any) {
    super(props, context);

    this.state = {
      cameraPermission: PermissionState.Requesting,
      codeScanned: false,
      currentAction: undefined,
      windowWidth: Dimensions.get("window").width
    };
  }

  public static navigationOptions = {
    title: "Scan QR-kode"
  };

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      cameraPermission:
        status === "granted" ? PermissionState.Granted : PermissionState.Denied
    });
  }

  public render() {
    if (this.state.cameraPermission === PermissionState.Requesting) {
      return <View />;
    }

    if (this.state.cameraPermission === PermissionState.Denied) {
      return (
        <View
          style={{
            alignContent: "center",
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 20
          }}
        >
          <Text>
            App'en skal have adgang til at bruge kameraet for at den kan scanne
            QR-koder. Du giver app'en adgang inde i indstillingerne på din
            telefon.
          </Text>
          {/* Settings > Privacy > Camera */}
        </View>
      );
    }

    const floatViewfinderSize = 0.7 * this.state.windowWidth;
    const roundedViewfinderSize = 2 * Math.round(floatViewfinderSize / 2);

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center"
          }}
        >
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeScanned={this.handleBarCodeScanned}
            style={{
              height: roundedViewfinderSize,
              width: roundedViewfinderSize
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            marginTop: 10,
            textAlign: "center"
          }}
        >
          {this.getText(this.state.currentAction)}
        </Text>
        <View
          style={{
            marginBottom: ifIphoneX(50, 30),
            marginTop: 10,
            paddingHorizontal: 20
          }}
        >
          <SlideButton
            onTrigger={() => this.okButtonPressed()}
            disabled={this.state.currentAction === undefined}
            title="Bekræft"
          />
        </View>
      </View>
    );
  }

  private okButtonPressed() {
    if (this.state.currentAction === undefined) {
      throw new Error("OK button pressed, but currentAction is undefined.");
    }

    Wallet.performAction(this.state.currentAction);

    this.setState({
      codeScanned: false,
      currentAction: undefined
    });

    this.props.navigation.goBack();
  }

  private handleBarCodeScanned = ({ type, data }: any) => {
    const action = QrCodeParser.parseCodeValue(data);
    this.setState({
      codeScanned: true,
      currentAction: action
    });
  };

  private getText(action: Action | undefined): string {
    if (action === undefined) {
      if (this.state.codeScanned) {
        return "QR-koden er ikke accepteret.";
      }

      return "Scan en QR-kode.";
    }

    return action.text;
  }
}
