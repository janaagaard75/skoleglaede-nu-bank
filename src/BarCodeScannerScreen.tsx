import * as React from 'react'
import { BarCodeScanner } from 'expo'
import { Permissions } from 'expo'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'

// The type definitions for BarCodeScanner are unfortunately not correct.
const UntypedBarCodeScanner = BarCodeScanner as any

enum PermissionState {
  Unknown,
  Denied,
  Granted
}

interface State {
  cameraPermission: PermissionState
  scannedText: string
}

export class BarCodeScannerScreen extends React.Component<{}, State> {
  constructor(props: {}, context?: any) {
    super(props, context)

    this.state = {
      cameraPermission: PermissionState.Unknown,
      scannedText: ''
    }
  }

  public static navigationOptions = {
    title: 'BarCodeScanner'
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      cameraPermission: status === 'granted' ? PermissionState.Granted : PermissionState.Denied
    })
  }

  public render() {
    switch (this.state.cameraPermission)
    {
      case PermissionState.Unknown:
        return <Text>Requesting for camera permission.</Text>

      case PermissionState.Denied:
        return <Text>No access to the camera.</Text>

      case PermissionState.Granted:
        return (
          <View style={{ flex: 1 }}>
            <Text>
              {this.state.scannedText}
            </Text>
            <View style={{ flex: 1 }}>
              <UntypedBarCodeScanner
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={this.handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
              />
            </View>
          </View>
        )

      default:
        const _exhaustiveCheck: never = this.state.cameraPermission
        return _exhaustiveCheck
    }
  }

  private handleBarCodeScanned = ({ type, data }: any) => {
    this.setState({
      scannedText: data
    })
  }
}