import {MotiView, motify} from 'moti';
import {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {LoadingButtonLoader, type ActivityStatus} from './loading-button';
import {haptic} from 'utils';
import colors from 'theme';

type LoadingButtonProps = {
  onPress?: () => Promise<void>;
  style?: StyleProp<ViewStyle>;
  status: ActivityStatus;
  titleFromStatusMap?: Record<ActivityStatus, string>;
};

const MotifiedAnimatedText = motify(Animated.Text)();
const colorFromStatusMap = {
  idle: colors.gray9,
  loading: colors.gray6,
  success: colors.green,
  error: colors.danger,
};

const LoadingButton: React.FC<LoadingButtonProps> = props => {
  const {onPress, style, status, titleFromStatusMap} = props;
  const [currentStatus, setCurrentStatus] = useState<ActivityStatus>(status);
  const isActive = useSharedValue(false);
  useEffect(() => {
    setCurrentStatus(status);
    const isEndStatus = status === 'error' || status === 'success';
    if (isEndStatus) {
      setTimeout(() => {
        setCurrentStatus('idle');
      }, 3000);
    }
    return () => {
      if (isEndStatus) {
        setCurrentStatus('idle');
      }
    };
  }, [status]);

  const gesture = Gesture.Tap()
    .maxDuration(4000)
    .onTouchesDown(() => {
      isActive.value = true;
    })
    .onTouchesUp(() => {
      if (currentStatus !== 'idle') return;
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onFinalize(() => {
      isActive.value = false;
    });

  const scale = useDerivedValue(() => {
    return withSpring(isActive.value ? 0.9 : 1);
  });

  const activeColor = useMemo(() => {
    if (currentStatus && currentStatus !== 'idle') {
      haptic();
    }
    return colorFromStatusMap?.[currentStatus ?? 'idle'];
  }, [colorFromStatusMap, currentStatus]);

  const rStyle = useAnimatedStyle(() => {
    return {transform: [{scale: scale.value}]};
  }, []);

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View layout={Layout.duration(500)} style={rStyle}>
          <MotiView
            transition={{type: 'timing', duration: 1000}}
            style={[styles.motiView, style]}
            animate={{
              backgroundColor: activeColor,
            }}>
            <LoadingButtonLoader status={currentStatus} color={'white'} />

            <MotifiedAnimatedText
              entering={FadeIn}
              exiting={FadeOut}
              transition={{type: 'timing', duration: 1000}}
              animate={{color: 'white'}}
              style={[styles.title, {color: 'white'}]}>
              {titleFromStatusMap?.[currentStatus ?? 'idle']}
            </MotifiedAnimatedText>
          </MotiView>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.white,
  },
  motiView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 25,
  },
});

export {LoadingButton};
