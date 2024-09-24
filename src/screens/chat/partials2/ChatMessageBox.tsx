import {AssetSvg, Text} from 'components';
import React, {useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

const ReactionItems = [
  {
    id: 0,
    emoji: '😇',
    title: 'like',
  },
  {
    id: 1,
    emoji: '🥰',
    title: 'love',
  },
  {
    id: 2,
    emoji: '🤗',
    title: 'care',
  },
  {
    id: 3,
    emoji: '😘',
    title: 'kiss',
  },
  {
    id: 4,
    emoji: '😂',
    title: 'laugh',
  },
  {
    id: 5,
    emoji: '😎',
    title: 'cool',
  },
];
const ChatMessageBox = ({setReplyOnSwipeOpen, updateRowRef, ...props}) => {
  const [selectedEmoji, setSelectedEmoji] = useState({});
  const isNextMyMessage =
    props?.currentMessage &&
    props?.nextMessage &&
    props?.isSameUser &&
    props?.isSameDay;

  const renderRightAction = (
    progressAnimatedValue: Animated.AnimatedInterpolation<any>,
  ) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 12, 20],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {transform: [{scale: size}, {translateX: trans}]},
          isNextMyMessage
            ? styles.defaultBottomOffset
            : styles.bottomOffsetNext,
          props.position === 'right' && styles.leftOffsetValue,
        ]}>
        <View style={styles.replyImageWrapper}>
          <AssetSvg name={'right_arrow'} />
        </View>
      </Animated.View>
    );
  };

  const onSwipeOpenAction = () => {
    if (props.currentMessage) {
      setReplyOnSwipeOpen({...props.currentMessage});
    }
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={updateRowRef}
        friction={2}
        rightThreshold={40}
        renderLeftActions={renderRightAction}
        onSwipeableWillOpen={onSwipeOpenAction}></Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
  },
  replyImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyImage: {
    width: 20,
    height: 20,
  },
  defaultBottomOffset: {
    marginBottom: 2,
  },
  bottomOffsetNext: {
    marginBottom: 10,
  },
  leftOffsetValue: {
    marginLeft: 16,
  },
});

export default ChatMessageBox;
