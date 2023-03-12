import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { HomeStackParamList } from "./App";
import { SlideButton } from "./SlideButton";

type Props = NativeStackScreenProps<HomeStackParamList, "ResetScreen"> & {
  onResetButtonSlide: () => void;
};

export const ResetScreen = (props: Props) => {
  const resetWallet = () => {
    props.onResetButtonSlide();
    props.navigation.goBack();
  };

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
        <SlideButton onTrigger={resetWallet} title="Nulstil" />
      </View>
    </View>
  );
};
