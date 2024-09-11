import React, {useCallback} from 'react';
import {Image, Pressable, ImageSourcePropType} from 'react-native';
import Animated, {
  withTiming,
  interpolate,
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Haptic from 'react-native-haptic-feedback';
import {BackgroundProps, EmojiItemProps} from './types';
import {styles} from './styles';
import MessageItem from './message-item';
import {isAndroidPlatform, isIosPlatform} from 'utils';
import {Text} from 'components';

const EMOJI = ['😊', '😢', '😍', '😂', '😧', '😡'];

const BACKGROUND_BLUR_RADIUS = isIosPlatform ? 50 : 15;

const AnimPressable = Animated.createAnimatedComponent(Pressable);

export const triggerSelectionHaptik = () => {
  if (isAndroidPlatform) {
    Haptic.trigger('effectClick', HAPTIC_CONFIG);
  } else {
    Haptic.trigger('selection', HAPTIC_CONFIG);
  }
};

export default ({
  opacity,
  captureUri,
  clonedItem,
  clonedItemToPass,
  onPressOut,
}: BackgroundProps) => {
  const animateDismiss = useSharedValue(0);

  const emojiStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animateDismiss.value, [0, 1], [0, 1]),
    transform: [{scale: interpolate(animateDismiss.value, [0, 1], [0.5, 1])}],
  }));

  const onDismiss = useCallback(
    (id?: string, emoji?: ImageSourcePropType, vibrate = false) => {
      animateDismiss.value = withTiming(0, {duration: 50});
      onPressOut(id, emoji === clonedItemToPass.emoji ? undefined : emoji);
      vibrate && triggerSelectionHaptik();
    },
    [clonedItemToPass],
  );

  const renderItem = useCallback(
    ({item, index}: EmojiItemProps) => {
      const backgroundColor =
        clonedItemToPass.emoji === item ? '#d3d3d3' : 'transparent';

      return (
        <AnimPressable
          key={`emoji-${index}`}
          entering={SlideInDown.delay(index * 50)}
          onPress={() => onDismiss(clonedItemToPass.id, item, true)}
          style={[{backgroundColor}, styles.emojiSelectedContainer]}>
          <Text style={styles.emoji}>{item}</Text>
        </AnimPressable>
      );
    },
    [clonedItemToPass],
  );

  React.useEffect(() => {
    if (captureUri) {
      animateDismiss.value = withTiming(1);
    }
  }, [captureUri]);

  if (
    !captureUri ||
    typeof clonedItem?.id !== 'string' ||
    typeof clonedItem?.top !== 'number'
  ) {
    return null;
  }

  return (
    <>
      <AnimPressable style={styles.blurBg} onPress={() => onDismiss()}>
        <Animated.Image
          source={{uri: captureUri}}
          blurRadius={BACKGROUND_BLUR_RADIUS}
          style={[opacity, styles.capturedImg]}
        />
      </AnimPressable>
      <Animated.View
        style={[opacity, styles.clonedMessage, {top: clonedItem?.top}]}>
        <MessageItem item={{...clonedItemToPass, emoji: undefined}} />
        <Animated.View style={[emojiStyle, styles.emojiContainer]}>
          {EMOJI.map((item, index) => renderItem({item, index}))}
        </Animated.View>
      </Animated.View>
    </>
  );
};

export const HAPTIC_CONFIG = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};
