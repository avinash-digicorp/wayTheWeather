import React, {Dispatch, SetStateAction} from 'react';
import {ImageSourcePropType, TextInput} from 'react-native';
import {AnimatedStyle, SharedValue} from 'react-native-reanimated';

export type Message = {
  id: string;
  image: ImageSourcePropType;
  name: string;
  message: string;
  time: string;
  animate?: boolean;
  isOwnerOfChat?: boolean | undefined;
  emoji?: ImageSourcePropType;
};

export type MessageItemProps = {
  item: Message;
  capture?: (id: string, top: number) => void;
  scrollY?: SharedValue<number>;
  handleKeyboard?: () => void;
  scrollToFirstItem?: () => void;
};

export type WrapperProps = {
  children: React.ReactNode;
};

export type BackgroundProps = {
  captureUri: string | null;
  opacity: AnimatedStyle;
  clonedItemToPass: Message;
  clonedItem: {id: string; top: number | null};
  onPressOut: (id?: string, emoji?: ImageSourcePropType) => void;
};

export type EmojiItemProps = {
  item: ImageSourcePropType;
  index: number;
};

export type SearchMessageInput = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  inputRef: React.RefObject<TextInput>;
  onPressSend: (input: string) => void;
};