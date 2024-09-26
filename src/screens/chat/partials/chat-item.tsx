import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AssetSvg, ButtonView, Text} from 'components';
import Animated, {
  CurvedTransition,
  Easing,
  FadingTransition,
  JumpingTransition,
  LinearTransition,
  SequencedTransition,
  SharedTransition,
  StretchInX,
} from 'react-native-reanimated';
import colors from 'theme';
import {Message} from './types';
import {hasLength} from 'utils';
import MessageText from './message-text';

interface IChatItemProps {
  item: Message;
  index: number;
  setSelectedMessage?: (message: Message) => void;
  selectedMessage: Message | null;
}
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
export default (props: IChatItemProps) => {
  const {item, selectedMessage, reactionChanges, setSelectedMessage} = props;
  if (item.type === 'date') {
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    );
  }
  const showEmojiPicker = selectedMessage?.id === item.id;
  const messageReactions = item?.reactions;
  const isUser = item?.user?.id === 0;
  const setMessageItem = () => setSelectedMessage(item);
  const onSelectReaction = (reaction: string) => {
    reactionChanges(reaction, item.id);
    setSelectedMessage(null);
  };
  return (
    <View
      style={[
        styles.mainContainer,
        isUser && {alignItems: 'flex-end'},
        showEmojiPicker && styles.mainContainerSelected,
      ]}>
      <View
        style={[isUser && {flexDirection: 'row-reverse'}]}
        className="flex-row w-full">
        <AnimatedButton
          layout={CurvedTransition}
          activeOpacity={0.9}
          style={{maxWidth: '82%'}}
          onLongPress={setMessageItem}
          onPress={() => showEmojiPicker && setSelectedMessage(null)}
          className={'px-3 py-2 rounded-2xl mx-2 flex-row bg-primary-300'}>
          <MessageText text={item?.text} />
        </AnimatedButton>
        <View
          style={[{width: '18%'}, isUser && {alignItems: 'flex-end'}]}
          className="justify-center">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={setMessageItem}
            className={'items-center justify-center w-8 h-8'}>
            <AssetSvg width={30} height={30} name="emoji" />
          </TouchableOpacity>
        </View>
      </View>
      <Reactions
        isUser={isUser}
        onPress={() => setSelectedMessage(showEmojiPicker ? null : item)}
        reactions={messageReactions}
      />
      <ReactionPicker
        isUser={isUser}
        onSelectReaction={onSelectReaction}
        show={showEmojiPicker}
        reactions={messageReactions}
      />
    </View>
  );
};
const Reactions = ({reactions, isUser, onPress}) => {
  const reactionList = groupReactions(reactions);
  if (!hasLength(reactionList)) return;
  return (
    <Animated.View
      layout={CurvedTransition.easingX(Easing.sin).easingY(Easing.exp)}
      style={[
        styles.emojiContainer,
        styles.reactionContainer,
        isUser ? {right: 20} : {left: 20},
      ]}>
      {reactionList?.map?.((reaction, index) => {
        const text =
          reaction?.count > 1
            ? `${reaction?.emoji} ${reaction?.count}`
            : reaction?.emoji;
        return (
          <ButtonView onPress={onPress} key={index}>
            <Text className="text-xs" text={text} />
          </ButtonView>
        );
      })}
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
const ReactionPicker = ({onSelectReaction, show}: ReactionPickerProps) => {
  if (!show) {
    return null;
  }
  return (
    <Animated.View
      entering={StretchInX}
      layout={CurvedTransition.easingX(Easing.sin).easingY(Easing.exp)}
      style={[styles.emojiContainer, styles.pickerContainer]}>
      {REACTIONS.map((emoji, index) => (
        <ButtonView onPress={() => onSelectReaction(emoji)} key={index}>
          <Text className="text-xl" text={emoji} />
        </ButtonView>
      ))}
    </Animated.View>
  );
};

const groupReactions = (reactions = []) => {
  return reactions.reduce((acc, {emoji}) => {
    const existingReaction = acc.find(item => item.emoji === emoji);
    if (existingReaction) {
      existingReaction.count += 1;
    } else {
      acc.push({emoji, count: 1});
    }
    return acc;
  }, []);
};

const styles = StyleSheet.create({
  mainContainerSelected: {
    backgroundColor: colors.primary5,
  },
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
    paddingBottom: 27,
  },
  messageContainer: {maxWidth: '82%'},
  emojiContainer: {
    zIndex: 999,
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
  dateContainer: {
    zIndex: -1,
    backgroundColor: '#dcdcdc',
    padding: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    marginVertical: 10,
  },
  dateText: {
    fontSize: 12,
  },
});
