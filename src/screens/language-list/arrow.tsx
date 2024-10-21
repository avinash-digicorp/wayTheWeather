import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {AssetSvg} from 'components';
import {SCREEN_WIDTH, vibrate} from 'utils';
import colors from 'theme';

const {width: screenWidth} = Dimensions.get('window');
const BUTTON_WIDTH = SCREEN_WIDTH * 0.9;
const BUTTON_HEIGHT = 65;
const BUTTON_PADDING = 0;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

const ArrowAnimation = ({onSwipeSuccess}) => {
  const [toggled, setToggled] = useState(false);
  const changeCounter = useSharedValue(0); // Initialize the change counter
  const lastHapticTime = useSharedValue(0); // Track the last haptic feedback time
  const translateX = useSharedValue(-100);
  const scale = useSharedValue(0.1);
  const bgColor = useSharedValue('transparent');
  const isSwipable = useSharedValue(false);
  const gestureTranslateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(100, {duration: 500, easing: Easing.ease});
    scale.value = withTiming(1.3, {duration: 500, easing: Easing.ease});

    setTimeout(() => {
      translateX.value = withTiming(0, {duration: 500, easing: Easing.ease});
      scale.value = withTiming(1, {duration: 500, easing: Easing.ease});
      bgColor.value = withTiming(
        '#ddd',
        {duration: 500, easing: Easing.ease},
        () => {
          runOnJS(setSwipable)(true);
        },
      );
    }, 500);
  }, []);

  const setSwipable = value => {
    isSwipable.value = value;
  };
  const handleComplete = isToggled => {
    if (isToggled !== toggled) {
      const onFail = () => {
        translateX.value = withSpring(isToggled ? 0 : H_SWIPE_RANGE);
        setToggled(!isToggled);
      };
      setToggled(isToggled);
      // onToggle?.(() => {}, onFail);
    }
  };
  // Gesture handler for swiping
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
      runOnJS(vibrate)('effectTick');
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      const currentTime = Date.now();
      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        translateX.value = newValue;
        changeCounter.value += +1;
      }
      if (
        changeCounter.value % 10 === 0 &&
        currentTime - lastHapticTime.value > 100
      ) {
        runOnJS(vibrate)();
        lastHapticTime.value = currentTime;
      }
    },
    onEnd: () => {
      if (translateX.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        translateX.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        translateX.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
      runOnJS(vibrate)('virtualKeyRelease');
      changeCounter.value = 0; // Reset the counter after gesture ends
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const swipeX = isSwipable.value ? gestureTranslateX.value : 0; // Apply gesture translate if swipable
    return {
      transform: [
        {translateX: translateX.value + swipeX},
        {scale: scale.value},
      ],
      backgroundColor: bgColor.value,
    };
  });

  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{translateX: translateX.value}, {scale: scale.value}],
        backgroundColor: bgColor.value,
      };
    }),
  };
  return (
    <Animated.View style={[styles.swipeCont]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
          <AssetSvg width={35} height={35} name="right_arrow_2" fill="#fff" />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorWave: {
    position: 'absolute',
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
  },
  swipeable: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 2,
    color: colors.primary,
    paddingLeft: 50,
  },
  swipeText2: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingRight: 50,
  },
  arrow: {width: 50, alignItems: 'center'},
  box: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});

export default ArrowAnimation;
