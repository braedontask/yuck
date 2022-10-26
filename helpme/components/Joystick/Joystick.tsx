import {
  Animated,
  Dimensions,
  View,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {useRef} from 'react';
import React from 'react';
import {JoystickHelper, SwipeHandlersType} from './JoystickHelper';

interface JoystickPropTypes {
  onButtonPress: () => void;
  swipeHandlers: SwipeHandlersType;
}

const {width, height} = Dimensions.get('window');

const START_RADIUS = 0.45;
const DEPRESSED_RADIUS = 0.5;

const Joystick = (props: JoystickPropTypes) => {
  const {onButtonPress, swipeHandlers} = props;
  const joystickHelper = new JoystickHelper(width, height);
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        Animated.timing(colorRef, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start();
        Animated.timing(radiusRef, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start();
        onButtonPress();
        return true;
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderGrant: () => {},
      onPanResponderRelease: (
        e: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        Animated.timing(colorRef, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
        Animated.timing(radiusRef, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
        Animated.spring(pan, {
          bounciness: 20,
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
        const classification = joystickHelper.classify(
          gestureState.dx,
          gestureState.dy,
        );
        // calls the handler given by the classification
        swipeHandlers[classification]();
      },
    }),
  ).current;
  const colorRef = useRef(new Animated.Value(0)).current;
  const radiusRef = useRef(new Animated.Value(0)).current;

  const color = colorRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['#rgb(75, 127, 82)', 'rgb(125,209,129)'],
  });

  const radius = radiusRef.interpolate({
    inputRange: [0, 1],
    outputRange: [START_RADIUS * width, DEPRESSED_RADIUS * width],
  });

  return (
    <View>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          borderRadius: Math.round(width + height) / 2,
          width: radius,
          height: radius,
          backgroundColor: color,
        }}
        {...panResponder.panHandlers}>
        <View />
      </Animated.View>
    </View>
  );
};

export default Joystick;
