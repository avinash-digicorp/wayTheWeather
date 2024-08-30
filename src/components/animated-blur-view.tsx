import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, ViewStyle} from 'react-native';
import {BlurView, BlurViewProps} from '@react-native-community/blur';
import {useIsFocused} from '@react-navigation/native';

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
  duration = 2000,
  style,
  ...props
}) => {
  const blur = useRef(new Animated.Value(initialBlurAmount)).current;
  const scale = useRef(new Animated.Value(1.2)).current;
  const focused = useIsFocused();
  useEffect(() => {
    if (!focused) return;
    blur.setValue(initialBlurAmount);
    scale.setValue(1.2);
    Animated.parallel([
      Animated.timing(blur, {
        toValue: blurAmount,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();

    return () => {};
  }, [focused, blurAmount, duration]);

  return (
    <Blur blurType="light" blurAmount={blur} style={[styles.blurView, style]}>
      <Animated.View {...props} style={{flex: 1, transform: [{scale}]}}>
        {props.children}
      </Animated.View>
    </Blur>
  );
};

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
});
