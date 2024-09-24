import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ButtonView, Text} from 'components';
import Animated, {
  CurvedTransition,
  Easing,
  StretchInX,
} from 'react-native-reanimated';
import colors from 'theme';

interface IChatItemProps {
  item: {
    id: string;
    from: number;
    date: string;
    text: string;
    reactions: {userId: number; emoji: string}[];
  };
  index: number;
  onLongPress?: () => void;
  longPressedMessageId?: string;
}
export default (props: IChatItemProps) => {
  const {item, setLongPressedMessageId, onLongPress, longPressedMessageId} =
    props;
  const showEmojiPicker = longPressedMessageId === item._id;
  const messageReactions = item?.reactions;
  const isUser = item?.user?._id === 0;

  return (
    <View
      style={[
        styles.mainContainer,
        isUser && {alignItems: 'flex-end'},
        showEmojiPicker && styles.mainContainerSelected,
      ]}>
      <ButtonView
        onLongPress={() => onLongPress(item)}
        style={styles.messageContainer}
        className={
          'px-3 py-2 rounded-2xl mx-2 flex-row items-center justify-center bg-primary-300'
        }>
        <Text>{item.text}</Text>
      </ButtonView>

      <Reactions
        isUser={isUser}
        onPress={() => setLongPressedMessageId(showEmojiPicker ? '' : item._id)}
        reactions={messageReactions}
      />
      <ReactionPicker
        isUser={isUser}
        onPress={() => setLongPressedMessageId(showEmojiPicker ? '' : item._id)}
        show={showEmojiPicker}
        reactions={messageReactions}
      />
    </View>
  );
};
const Reactions = ({reactions, isUser, onPress}) => {
  return (
    <Animated.View
      layout={CurvedTransition.easingX(Easing.sin).easingY(Easing.exp)}
      style={[
        styles.emojiContainer,
        styles.reactionContainer,
        isUser ? {right: 20} : {left: 20},
      ]}>
      {reactions?.map?.((reaction, index) => (
        <ButtonView onPress={onPress} key={index}>
          <Text className="text-xs" text={reaction} />
        </ButtonView>
      ))}
    </Animated.View>
  );
};
interface ReactionPickerProps {
  show: boolean;
  reactions: {userId: number; emoji: string}[];
  isUser: boolean;
  addReaction: (emoji: string) => void;
}

const REACTIONS = ['😊', '😂', '😍', '😢', '😡'];
const ReactionPicker = ({addReaction, show}: ReactionPickerProps) => {
  if (!show) {
    return null;
  }
  return (
    <Animated.View
      entering={StretchInX}
      layout={CurvedTransition.easingX(Easing.sin).easingY(Easing.exp)}
      style={[styles.emojiContainer, styles.pickerContainer]}>
      {REACTIONS.map((emoji, index) => (
        <ButtonView onPress={() => addReaction(emoji)} key={index}>
          <Text className="text-xl" text={emoji} />
        </ButtonView>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainerSelected: {
    justifyContent: 'flex-end',
    backgroundColor: colors.primary5,
  },
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
    paddingBottom: 27,
  },
  messageContainer: {width: '82%'},
  emojiContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    elevation: 5,
    borderRadius: 200,
    position: 'absolute',
  },
  reactionContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    bottom: 0,
  },
  pickerContainer: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    top: -50,
    flex: 1,
    width: '70%',
    alignSelf: 'center',
  },
});
