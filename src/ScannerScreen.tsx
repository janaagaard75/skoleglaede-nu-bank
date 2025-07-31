import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera, CameraView } from "expo-camera";
import { BarCodeScanningResult } from "expo-camera/build/legacy/Camera.types";
import { PermissionStatus } from "expo-modules-core";
import { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { HomeStackParamList } from "./App";
import { SlideButton } from "./SlideButton";
import { Action } from "./actions/Action";
import { parseCodeValue } from "./parseCodeValue";

enum CameraPermissionState {
  Requesting,
  Denied,
  Granted,
}

type Props = NativeStackScreenProps<HomeStackParamList, "ScannerScreen"> & {
  okButtonSlide: (action: Action) => void;
};

type State = {
  cameraPermission: CameraPermissionState;
  codeScanned: boolean;
  currentAction: Action | undefined;
  windowWidth: number;
};

export class ScannerScreen extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      cameraPermission: CameraPermissionState.Requesting,
      codeScanned: false,
      currentAction: undefined,
      windowWidth: Dimensions.get("window").width,
    };
  }

  public async componentDidMount() {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      this.setState({
        cameraPermission:
          status === PermissionStatus.GRANTED
            ? CameraPermissionState.Granted
            : CameraPermissionState.Denied,
      });
    };

    await getCameraPermissions();
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
            App&apos;en skal have adgang til at bruge kameraet for at den kan
            scanne QR-koder. Du giver app&apos;en adgang inde i indstillingerne
            på din telefon.
          </Text>
        </View>
      );
    }

    const exactViewfinderSize = 0.7 * this.state.windowWidth;
    const roundedViewfinderSize = 2 * Math.round(exactViewfinderSize / 2);

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={this.handleBarCodeScanned}
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
            disabled={this.state.currentAction === undefined}
            onSlide={() => {
              this.okButtonSlide();
            }}
            title="Bekræft"
          />
        </View>
      </View>
    );
  }

  private okButtonSlide() {
    if (this.state.currentAction === undefined) {
      throw new Error("OK button pressed, but currentAction is undefined.");
    }

    this.props.okButtonSlide(this.state.currentAction);

    this.setState({
      codeScanned: false,
      currentAction: undefined,
    });

    this.props.navigation.goBack();
  }

  private handleBarCodeScanned = (scanningResult: BarCodeScanningResult) => {
    const action = parseCodeValue(scanningResult.data);
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
