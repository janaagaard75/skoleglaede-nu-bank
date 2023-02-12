# Skoleglæde.nu Bank

Wallet with virtual money for [Skoleglæde.nu](https://skoleglæde.nu/).

## Running the App

Start the local server. This will give you a QR code that you can scan using the Expo Client app on your mobile device.

    yarn start

[QR Codes](qr-codes.pdf)

## Known and Unknown Packages

Known package: expo-barcode-scanner, expo-secure-store, @expo/vector-icons, react, react-native, react-native-gesture-handler, react-native-safe-area-context, react-native-screens, typescript, @babel/core, babel-preset-expo, @types/react-native, expo.

Unknown packages: @react-navigation/native, @react-navigation/native-stack, react-native-iphone-x-helper, tslib, @typescript-eslint/eslint-plugin, @typescript-eslint/parser, eslint, eslint-config-prettier, eslint-plugin-prettier, eslint-plugin-react, expo-cli, prettier.

## To Do

- Sound effects
- Animate amounts
  - Slide up and down when adding or subtracting
  - Fade out and in when resetting
- Better layout
  - Commas on numbers should align
  - Broke and reset screens are too empty
- Show current amounts throughout the app?
- TestFlight on iOS
- Actual hash check
- Equivalent for TestFlight on Android
