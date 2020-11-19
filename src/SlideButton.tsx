import * as React from "react";
import { Component } from "react";
import { Animated, Easing, LayoutChangeEvent, LayoutRectangle, PanResponder, PanResponderInstance, Text, View } from "react-native";

interface Props {
  disabled?: boolean;
  onTrigger: () => void;
  title: string;
}

enum SliderState {
  Animating,
  DropWillCancel,
  DropWillTriggerAction,
  Idle
}

interface State {
  buttonSize: LayoutRectangle | undefined;
  sliderSize: LayoutRectangle | undefined;
  sliderState: SliderState;
}

export class SlideButton extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);

    this.state = {
      buttonSize: undefined,
      sliderSize: undefined,
      sliderState: SliderState.Idle
    };

    this.animatedPosition = new Animated.Value(0);

    this.panResponder = PanResponder.create({
      onPanResponderEnd: (e, gestureState) => {
        if (this.state.sliderState === SliderState.DropWillTriggerAction) {
          this.props.onTrigger();
        }

        this.setState({
          sliderState: SliderState.Animating
        });

        Animated.timing(this.animatedPosition, {
          duration: 100,
          easing: Easing.ease,
          toValue: 0,
          useNativeDriver: true
        }).start(() => {
          if (this.state.sliderState !== SliderState.DropWillCancel) {
            this.setState({
              sliderState: SliderState.Idle
            });
          }
        });
      },
      onPanResponderMove: (e, gestureEvent) => {
        if (
          this.state.buttonSize === undefined ||
          this.state.sliderSize === undefined
        ) {
          throw new Error("Both buttonSize and sliderSize must be defined.");
        }

        const maximumDx =
          this.state.sliderSize.width - this.state.buttonSize.width;
        const restrictedDx = this.restrict(gestureEvent.dx, 0, maximumDx);
        const dropZoneWidth = 20;
        const withinDropZone = maximumDx - restrictedDx <= dropZoneWidth;
        this.setState({
          sliderState: withinDropZone
            ? SliderState.DropWillTriggerAction
            : SliderState.DropWillCancel
        });

        this.animatedPosition.setValue(restrictedDx);
      },
      onPanResponderStart: (e, gestureState) => {
        this.setState({
          sliderState: SliderState.DropWillCancel
        });
      },
      onStartShouldSetPanResponder: (e, gestureState) => !this.props.disabled
    });
  }

  private animatedPosition: Animated.Value;
  private panResponder: PanResponderInstance;

  public render() {
    const animatedViewStyle = {
      transform: [
        {
          translateX: this.animatedPosition
        }
      ]
    };

    return (
      <View
        style={{
          borderWidth: 2,
          padding: 3
        }}
      >
        <View
          onLayout={layoutEvent => this.setSliderSize(layoutEvent)}
          style={{
            alignItems: "flex-start",
            borderColor: "#000"
          }}
        >
          <Animated.View
            style={animatedViewStyle}
            {...this.panResponder.panHandlers}
          >
            <Text
              onLayout={layoutEvent => this.setButtonSize(layoutEvent)}
              style={{
                borderColor: this.props.disabled ? "#999" : "#000",
                borderWidth: 2,
                color: this.props.disabled ? "#999" : "#000",
                fontSize: 16,
                paddingHorizontal: 8,
                paddingVertical: 6
              }}
            >
              {this.props.title} &#x21E8;
            </Text>
          </Animated.View>
        </View>
      </View>
    );
  }

  private restrict(input: number, minimum: number, maximum: number): number {
    if (input < minimum) {
      return minimum;
    }

    if (input > maximum) {
      return maximum;
    }

    return input;
  }

  private setButtonSize(layoutEvent: LayoutChangeEvent): void {
    this.setState({
      buttonSize: layoutEvent.nativeEvent.layout
    });
  }

  private setSliderSize(layoutEvent: LayoutChangeEvent): void {
    this.setState({
      sliderSize: layoutEvent.nativeEvent.layout
    });
  }
}
