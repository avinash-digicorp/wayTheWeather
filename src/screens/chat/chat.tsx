import React, {useState} from 'react';
import {
  View,
  FlatList,
  Keyboard,
  TextInput,
  NativeScrollEvent,
  ImageSourcePropType,
  NativeSyntheticEvent,
  ImageBackground,
  Pressable,
} from 'react-native';
import Animated, {
  runOnJS,
  withDelay,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedKeyboard,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CaptureOptions, captureScreen} from 'react-native-view-shot';

import {triggerLongPressHaptik} from './partials/message-item';
import {Message} from './partials/types';
import MessageBg from './partials/message-bg';
import ChatScreenHeader from './partials/chat-screen-header';
import ChatInput from './partials/chat-input';
import {useKeyboard} from 'hooks';
import {isAndroidPlatform, isIosPlatform} from 'utils';
import {ASSET_IMAGES} from 'assets/images';

import {useCallback} from 'react';
import {Text, GestureResponderEvent} from 'react-native';
import {useAnimatedReaction} from 'react-native-reanimated';
import {MessageItemProps} from './partials/types';
import {SCREEN_WIDTH} from 'utils';

import {StyleSheet} from 'react-native';
import {fonts} from 'utils/fonts';
import ChatMessages from './partials/chat-messages';
import {AssetSvg, ButtonView, FadeIn} from 'components';
const AnimPressable = Animated.createAnimatedComponent(Pressable);
const DELAY_LONG_PRESS = isIosPlatform ? 250 : 150; //Default is 500ms

const captureOptions: CaptureOptions = {
  format: 'jpg',
  quality: 0.25,
  result: 'tmpfile', //File get deleted when app is opened again
};

export const Chat = () => {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const keyboardH = useKeyboard(true);
  const keyb = useAnimatedKeyboard({
    isStatusBarTranslucentAndroid: true,
  });

  const listRef = React.useRef<FlatList>(null);
  const inputRef = React.useRef<TextInput>(null);

  const scrollY = useSharedValue(0);
  const longPress = useSharedValue(0);
  const lockedHeight = useSharedValue(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [captureUri, setCaptureUri] = useState<string | null>(null);
  const [longPressedMessageId, setLongPressedMessageId] = useState(null);
  const [clonedItem, setClonedItem] = useState<{
    id: string;
    top: number | null;
  }>({id: '0', top: null});

  const marginTop = insets.top > 0 ? insets.top : 24;
  const paddingBottom = keyboardH > 0 ? keyboardH : 16;

  const opacity = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        longPress.value,
        [isIosPlatform ? 0 : 0.25, 1],
        [isIosPlatform ? 0 : 0.5, 1],
        Extrapolation.CLAMP,
      ),
    }),
    [],
  );

  const translateList = useAnimatedStyle(() => {
    if (lockedHeight.value && lockedHeight.value > keyb.height.value) {
      return {
        top: -lockedHeight.value,
      };
    }

    return {
      top: -keyb.height.value,
    };
  }, [keyb.height.value]);

  const clonedItemToPass = {
    ...(messages?.find(item => item?.id === clonedItem?.id) ?? messages[0]),
    animate: false,
  };

  const onPressSend = React.useCallback((message: string) => {
    if (message.length > 0) {
      setMessages(oldMessages => [
        {
          id: `${new Date()}-${Math.random()}`,
          image:
            'https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png',
          name: 'Mark 💻',
          message,
          time: '11:25 AM',
          animate: true,
        },
        ...oldMessages,
      ]);
      setInput('');
    }
  }, []);

  const scrollToFirstItem = React.useCallback(() => {
    try {
      listRef.current?.scrollToEnd({animated: true});
    } catch (e) {
      console.log({e});
    }
  }, []);

  const onScroll = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.value = e.nativeEvent.contentOffset.y;
    },
    [],
  );

  const capture = React.useCallback((id: string, top: number) => {
    captureScreen(captureOptions).then(uri => {
      isAndroidPlatform && triggerLongPressHaptik();
      longPress.value = withTiming(1, {duration: isIosPlatform ? 200 : 1});
      setClonedItem({id, top});
      setCaptureUri(uri);
    });
  }, []);

  const onPressOut = React.useCallback(
    (id?: string, emoji?: ImageSourcePropType) => {
      longPress.value = withTiming(0, {duration: 100}, finished => {
        if (finished) {
          runOnJS(setCaptureUri)(null);
          runOnJS(setClonedItem)({id: '', top: null});

          if (id) {
            runOnJS(onEmojiSelection)(id, emoji);
          }
        }
      });

      if (lockedHeight.value > 0) {
        inputRef.current?.focus();
        lockedHeight.value = withDelay(500, withTiming(0, {duration: 50}));
      }
    },
    [],
  );

  const handleKeyboard = React.useCallback(() => {
    if (keyb.height.value > 0) {
      lockedHeight.value = keyb.height.value;
      Keyboard.dismiss();
    }
  }, []);

  const onEmojiSelection = React.useCallback(
    (messageId: string, emojiSelection?: ImageSourcePropType) => {
      setMessages(oldMessages =>
        oldMessages.map(item =>
          item.id === messageId ? {...item, emoji: emojiSelection} : item,
        ),
      );
    },
    [],
  );

  React.useEffect(() => {
    setMessages(MESSAGES);
  }, []);

  return (
    <>
      <ImageBackground
        source={ASSET_IMAGES.chatBg}
        resizeMode="repeat"
        style={{
          flex: 1,
          position: 'absolute',
          backgroundColor: 'white',
          alignSelf: 'center',
          width: '500%',
          height: '500%',
          transform: [{rotate: '-20deg'}],
        }}
      />
      <MessageBg
        opacity={opacity}
        captureUri={captureUri}
        clonedItem={clonedItem}
        onPressOut={onPressOut}
        clonedItemToPass={clonedItemToPass}
      />

      <View style={styles.container}>
        <ChatScreenHeader />
        <Animated.View style={[translateList, {flex: 1}]}>
          <ChatMessages
            longPressedMessageId={longPressedMessageId}
            setLongPressedMessageId={setLongPressedMessageId}
          />
          <ChatInput
            input={input}
            inputRef={inputRef}
            setInput={setInput}
            onPressSend={onPressSend}
          />
        </Animated.View>
      </View>
    </>
  );
};

export const MESSAGES = [
  {
    id: '6',
    image: 'https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png',
    name: 'Jane Doe 🎵',
    message: 'Cool. See you there. 😊',
    time: '11:22 AM',
    isOwnerOfChat: true,
  },
  {
    id: '5',
    image: 'https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png',
    name: 'Mark 💻',
    message: 'Yeh we can meet at John’s Cafe. I will be there in an hour.',
    time: '11:11 AM',
  },
  {
    id: '4',
    image: 'https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png',
    name: 'Jane Doe 🎵',
    message:
      'It was exhausting. Do you have time for a coffee? It would be great to catch up. ☕',
    time: '10:50 AM',
    isOwnerOfChat: true,
  },
  // {
  //   id: '3',
  //   image: 'https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png',
  //   name: 'Mark 💻',
  //   message: 'How was your day?',
  //   time: '10:30 AM',
  // },

  // {
  //   id: '2',
  //   image: 'https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png',
  //   name: 'Jane Doe 🎵',
  //   message: 'I am good too.',
  //   time: '10:22 AM',
  //   isOwnerOfChat: true,
  // },
  // {
  //   id: '1',
  //   image: 'https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png',
  //   name: 'Mark 💻',
  //   message: 'Hey Jane. I am good. How are you?',
  //   time: '10:02 AM',
  // },
  // {
  //   id: '0',
  //   image: 'https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699_1280.png',
  //   name: 'Jane Doe 🎵',
  //   message: 'Hi, Mark. How is going? 😀',
  //   time: '10:00 AM',
  //   isOwnerOfChat: true,
  // },
];

const MessageItem = ({
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
      isIosPlatform && triggerLongPressHaptik();

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
        {flexDirection: 'row', width: '100%', alignSelf: 'center'},
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    zIndex: 1,
  },
  innerHeaderContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatLabel: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fonts.bold,
  },
  iconsContainer: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  send: {
    left: -2,
    width: 22,
    height: 22,
    transform: [{rotate: '45deg'}],
  },
  inputContainer: {
    marginTop: 8,
    borderRadius: 20,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    paddingTop: isIosPlatform ? 8 : 2,
    paddingLeft: isIosPlatform ? 16 : 14,
    height: 66,
  },
  input: {
    textAlignVertical: 'top',
    height: 50,
    fontSize: 16,
    width: SCREEN_WIDTH - 136,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    color: 'black',
  },
  sendContainer: {
    backgroundColor: '#033de6',
    position: 'absolute',
    padding: 12,
    borderRadius: 30,
    right: 16,
    top: isIosPlatform ? 10 : 11,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  messageInnerContainer: {
    flex: 1,
    borderColor: '#white',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'white',
  },
  messageName: {
    fontFamily: fonts.semiBold,
  },
  messageTime: {
    fontFamily: fonts.regular,
    color: '#a1a1a1',
  },
  messageRecipient: {
    marginRight: 12,
  },
  messageSender: {
    marginLeft: 12,
    marginRight: 8,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  message: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 20,
  },
  messageSenderBorder: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  messageRecipientBorder: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  avatar: {
    width: 36,
    height: 36,
  },
  capturedImg: {
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  blurBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  clonedMessage: {
    position: 'absolute',
    width: '100%',
    zIndex: 201,
    overflow: 'hidden',
  },
  emojiContainer: {
    zIndex: 100,
    width: SCREEN_WIDTH - 104,
    borderColor: '#white',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
    alignSelf: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  emojiSelectedContainer: {
    padding: 4,
    borderRadius: 8,
  },
  emoji: {
    width: 32,
    height: 32,
  },
  smallEmojiContainer: {
    backgroundColor: 'white',
    borderColor: '#white',
    borderWidth: 1,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    right: 12,
    bottom: -14,
    position: 'absolute',
  },
  smallEmoji: {
    width: 16,
    height: 16,
  },
});
