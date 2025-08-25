import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { HomeStackParamList } from "./App";
import { SlideButton } from "./SlideButton";

type Props = NativeStackScreenProps<HomeStackParamList, "BrokeScreen"> & {
  onBrokeButtonSlide: () => void;
};

export const BrokeScreen = (props: Props) => {
  const broke = () => {
    props.onBrokeButtonSlide();
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
          Nulstil din konto til 0,00 kroner? Din opsparing ændres ikke.
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
        <SlideButton
          onSlide={broke}
          title="Fallit"
        />
      </View>
    </View>
  );
};
