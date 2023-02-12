import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  fontSize: number;
  disabled?: boolean;
  onPress: () => void;
  selected?: boolean;
  title: string;
}

export const Button = (props: Props) => {
  const handlePress = () => {
    if (props.disabled) {
      return;
    }

    props.onPress();
  };

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={() => handlePress()}
      style={{
        alignItems: "center",
        backgroundColor: props.selected ? "#bbb" : "transparent",
        borderColor: props.disabled ? "#999" : "#000",
        borderWidth: 2,
        paddingHorizontal: Math.round((props.fontSize / 16) * 11),
        paddingVertical: Math.round((props.fontSize / 16) * 9),
        width: "100%",
      }}
    >
      <Text
        style={{
          color: props.disabled ? "#999" : "#000",
          fontSize: props.fontSize,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
