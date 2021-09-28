import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  fontSize: number;
  disabled?: boolean;
  onPress: () => void;
  selected?: boolean;
  title: string;
}

export class Button extends Component<Props> {
  public render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        onPress={() => this.onPress()}
        style={{
          alignItems: "center",
          backgroundColor: this.props.selected ? "#bbb" : "transparent",
          borderColor: this.props.disabled ? "#999" : "#000",
          borderWidth: 2,
          paddingHorizontal: Math.round((this.props.fontSize / 16) * 11),
          paddingVertical: Math.round((this.props.fontSize / 16) * 9),
          width: "100%",
        }}
      >
        <Text
          style={{
            color: this.props.disabled ? "#999" : "#000",
            fontSize: this.props.fontSize,
          }}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }

  private onPress(): void {
    if (this.props.disabled) {
      return;
    }

    this.props.onPress();
  }
}
