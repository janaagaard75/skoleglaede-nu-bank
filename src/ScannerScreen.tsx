import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Action } from "./actions/Action";
import { QrCodeParser } from "./actions/QrCodeParser";
import { HomeStackParamList } from "./App";
import { SlideButton } from "./SlideButton";
import { Wallet } from "./Wallet";

type Props = NativeStackScreenProps<HomeStackParamList, "ScannerScreen">;

enum CameraPermissionState {
  Requesting,
  Denied,
  Granted,
}

interface State {
  cameraPermission: CameraPermissionState;
  codeScanned: boolean;
  currentAction: Action | undefined;
  windowWidth: number;
}

export class ScannerScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      cameraPermission: CameraPermissionState.Requesting,
      codeScanned: false,
      currentAction: undefined,
      windowWidth: Dimensions.get("window").width,
    };
  }

  public async componentDidMount() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({
      cameraPermission:
        status === "granted"
          ? CameraPermissionState.Granted
          : CameraPermissionState.Denied,
    });
  }

  public render() {
    if (this.state.cameraPermission === CameraPermissionState.Requesting) {
      return <View />;
    }

    if (this.state.cameraPermission === CameraPermissionState.Denied) {
      return (
        <View
          style={{
            alignContent: "center",
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
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
            justifyContent: "center",
          }}
        >
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeScanned={this.handleBarCodeScanned}
            style={{
              height: roundedViewfinderSize,
              width: roundedViewfinderSize,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 10,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          {this.getText(this.state.currentAction)}
        </Text>
        <View
          style={{
            marginBottom: ifIphoneX(50, 30),
            marginTop: 10,
            paddingHorizontal: 20,
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
      currentAction: undefined,
    });

    this.props.navigation.goBack();
  }

  private handleBarCodeScanned: BarCodeScannedCallback = ({ data }) => {
    const action = QrCodeParser.parseCodeValue(data);
    this.setState({
      codeScanned: true,
      currentAction: action,
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
