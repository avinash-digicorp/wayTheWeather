import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, ViewStyle} from 'react-native';
import {BlurView, BlurViewProps} from '@react-native-community/blur';

const Blur = Animated.createAnimatedComponent(BlurView);
interface AnimatedBlurViewProps extends BlurViewProps {
  initialBlurAmount?: number;
  blurAmount?: number;
  duration?: number;
  style?: ViewStyle;
  blurType?: string;
}

export const AnimatedBlurView: React.FC<AnimatedBlurViewProps> = ({
  initialBlurAmount = 0,
  blurAmount = 20,
  duration = 3000,
  style,
  ...props
}) => {
  const blur = useRef(new Animated.Value(initialBlurAmount)).current;

  useEffect(() => {
    Animated.timing(blur, {
      toValue: blurAmount,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [blur, blurAmount, duration]);

  return (
    <Blur
      {...props}
      blurType="light"
      blurAmount={blur}
      style={[styles.blurView, style]}
    />
  );
};

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
});
