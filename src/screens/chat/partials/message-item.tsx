import React, {useCallback} from 'react';
import {Text, View, Pressable, GestureResponderEvent} from 'react-native';
import Animated, {
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';
import Haptic from 'react-native-haptic-feedback';
import {MessageItemProps} from './types';
import {styles} from './styles';
import {HAPTIC_CONFIG} from './message-bg';
import {isAndroidPlatform, isIosPlatform, SCREEN_WIDTH} from 'utils';

const DELAY_LONG_PRESS = isIosPlatform ? 250 : 150; //Default is 500ms

const AnimPressable = Animated.createAnimatedComponent(Pressable);

export const triggerLongPressHaptik = () => {
  if (isAndroidPlatform) {
    Haptic.trigger('longPress', HAPTIC_CONFIG);
  } else {
    Haptic.trigger('impactMedium', HAPTIC_CONFIG);
  }
};

export default ({
  item,
  scrollY,
  capture,
  handleKeyboard,
  scrollToFirstItem,
}: MessageItemProps) => {
  const scale = useSharedValue(item?.animate ? 0 : 1);

  useAnimatedReaction(
    () => {
      return scrollY?.value ?? 0;
    },
    (newScroll, oldScroll) => {
      if (newScroll === 0 && oldScroll === 0) {
        return null;
      } else if (newScroll === 0 && oldScroll !== 0) {
        scale.value = withTiming(1);
      }
    },
  );

  const animStyle = useAnimatedStyle(() => {
    if (!item?.animate) {
      return {};
    }

    return {
      transform: [
        {
          scale: interpolate(
            scale.value,
            [0.15, 1],
            [0, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
      left: interpolate(scale.value, [0.15, 1], [-(SCREEN_WIDTH - 48) / 2, 0]),
      top: interpolate(scale.value, [0.15, 1], [-40, 0]),
    };
  }, []);

  const animImgStyle = useAnimatedStyle(() => ({
    transform: [{scale: !item?.animate ? 1 : scale.value}],
  }));

  const customEntering = useCallback(() => {
    'worklet';
    let animations = {
      opacity: withTiming(1),
      transform: [{scale: withTiming(1)}],
    };
    let initialValues = {
      opacity: 0,
      transform: [{scale: 0}],
    };

    return {
      initialValues,
      animations,
    };
  }, []);

  const customExiting = useCallback(() => {
    'worklet';
    const animations = {
      opacity: withTiming(0),
      transform: [{scale: withTiming(0)}],
    };
    const initialValues = {
      opacity: 1,
      transform: [{scale: 1}],
    };
    return {
      initialValues,
      animations,
    };
  }, []);

  const onLongPress = React.useCallback(
    (e: GestureResponderEvent) => {
      triggerLongPressHaptik();

      !!handleKeyboard && handleKeyboard();

      !!capture &&
        capture(item.id, e.nativeEvent.pageY - e.nativeEvent.locationY);
    },
    [handleKeyboard, triggerLongPressHaptik],
  );

  React.useEffect(() => {
    if (item?.animate) {
      !!scrollToFirstItem && scrollToFirstItem();

      //Trigger animation if scroll position is at top
      if (scrollY?.value === 0) {
        scale.value = withTiming(1);
      }
    }
  }, []);
  const avatarStyle = [
    animImgStyle,
    styles.avatar,
    item.isOwnerOfChat ? styles.messageRecipient : styles.messageSender,
    item.isOwnerOfChat
      ? styles.messageRecipientBorder
      : styles.messageSenderBorder,
  ];
  return (
    <View
      style={[
        {flexDirection: 'row', width: '95%', alignSelf: 'center'},
        item.isOwnerOfChat && {flexDirection: 'row-reverse'},
      ]}>
      <Animated.Image source={{uri: item?.image}} style={avatarStyle} />
      <AnimPressable
        pointerEvents={'box-only'}
        onLongPress={onLongPress}
        delayLongPress={DELAY_LONG_PRESS}
        style={[
          animStyle,
          styles.messageInnerContainer,
          item?.isOwnerOfChat
            ? styles.messageSenderBorder
            : styles.messageRecipientBorder,
        ]}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageName}>{item?.name}</Text>
          <Text style={styles.messageTime}>{item?.time}</Text>
        </View>
        <Text style={styles.message}>{item?.message}</Text>
        {item.emoji && (
          <Animated.View
            exiting={customExiting}
            entering={customEntering}
            style={styles.smallEmojiContainer}>
            <Text style={styles.smallEmoji}>{item.emoji}</Text>
          </Animated.View>
        )}
      </AnimPressable>
    </View>
  );
};
