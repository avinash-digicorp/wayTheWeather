import {View} from 'react-native';
import React from 'react';
import {ButtonView, Text} from 'components';
import colors, {cn} from 'theme';
import clsx from 'clsx';
import Animated, {
  FadeIn,
  FadeOut,
  StretchInX,
  StretchOutX,
} from 'react-native-reanimated';

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
  const {item, index, onLongPress, longPressedMessageId} = props;
  const showEmojiPicker = longPressedMessageId === item._id;
  const messageReactions = item?.reactions;
  return (
    <View>
      <ButtonView
        onLongPress={() => onLongPress(item)}
        onPress={() => onLongPress(item)}
        className={
          'px-4 py-2 mb-8 rounded-2xl mx-2 flex-row items-center justify-center bg-primary-300'
        }>
        <Text>{item.text}</Text>
      </ButtonView>
      <Reactions show={!showEmojiPicker} reactions={messageReactions} />

      <RenderEmojiPicker show={showEmojiPicker} />
    </View>
  );
};

const Reactions = ({reactions, show}) => {
  if (!show) return null;
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <View className="flex-row bg-white items-center justify-between px-1 py-1 rounded-full absolute bottom-4 right-4">
        {reactions?.map?.((reaction, index) => (
          <ButtonView key={index}>
            <Text text={reaction} />
          </ButtonView>
        ))}
      </View>
    </Animated.View>
  );
};

const RenderEmojiPicker = ({show = false}) => {
  if (!show) return null;
  return (
    <Animated.View entering={StretchInX} exiting={FadeOut}>
      <View className="w-10/12 self-center flex-row bg-white shadow-lg items-center justify-between px-4 py-3 rounded-3xl absolute -bottom-2">
        {['😊', '😂', '😍', '😢', '😡'].map((emoji, index) => (
          <ButtonView key={index}>
            <Text text={emoji} />
          </ButtonView>
        ))}
      </View>
    </Animated.View>
  );
};
