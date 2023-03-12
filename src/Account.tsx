import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Formatter } from "./Formatter";

export const Account = (props: {
  amount: number;
  icon: "credit-card" | "bank";
  title: string;
  windowWidth: number;
}) => (
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
          fontSize: 0.05 * props.windowWidth,
          marginRight: 5,
          width: 24,
        }}
        name={props.icon}
      />
      <Text
        style={{
          alignSelf: "center",
          fontSize: 0.05 * props.windowWidth,
        }}
      >
        {props.title}
      </Text>
    </View>
    <Text
      style={{
        alignSelf: "center",
        fontSize: 0.13 * props.windowWidth,
        paddingRight: 10,
      }}
    >
      {Formatter.formatAsCurrency(props.amount)}
    </Text>
  </View>
);
