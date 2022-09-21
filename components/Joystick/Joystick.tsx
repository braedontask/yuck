import {
  Animated,
  Dimensions,
  View,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Alert,
} from 'react-native';
import {useRef} from 'react';

interface JoystickPropTypes {
  onButtonPress: () => void;
}

const {width, height} = Dimensions.get('window');

const START_RADIUS = 0.45;
const DEPRESSED_RADIUS = 0.5;

const Joystick = (props: JoystickPropTypes) => {
  const {onButtonPress} = props;
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
        Alert.alert(
          `${gestureState.dx.toString()}, ${gestureState.dy.toString()}`,
        );
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
