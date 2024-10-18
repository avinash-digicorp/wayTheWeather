import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';

export const ArrowAnimation = () => {
  // Shared values for the animation
  const translateX = useSharedValue(200); // Start off-screen (on the right)
  const arrowScale = useSharedValue(1); // Full size at the beginning
  const colorChange = useSharedValue(0); // For interpolating the color

  // Move arrow in from right to 200px
  useEffect(() => {
    translateX.value = withTiming(
      0,
      {
        duration: 1000,
        easing: Easing.ease,
      },
      () => {
        // Once the movement is complete, start the shrinking and color change
        arrowScale.value = withTiming(0.5, {
          duration: 500,
          easing: Easing.out,
        });
        colorChange.value = withTiming(1, {duration: 500});
      },
    );
  }, []);

  // Arrow movement and scale
  const animatedArrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}, {scale: arrowScale.value}],
      color: interpolateColor(colorChange.value, [0, 1], ['black', 'white']),
    };
  });

  // Background circle for arrow
  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      opacity: colorChange.value, // Start hidden, fade in with color change
      transform: [{scale: arrowScale.value}],
    };
  });

  return (
    <View style={styles.container}>
      {/* Blue background circle */}
      <Animated.View style={[styles.circle, animatedCircleStyle]} />

      {/* Arrow view */}
      <Animated.Text style={[styles.arrow, animatedArrowStyle]}>
        ➡️
      </Animated.Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end', // Positioning on the right side
    paddingRight: 20, // Some padding from the right edge
  },
  arrow: {
    fontSize: 50,
    color: 'black', // Initial arrow color
  },
  circle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
});
