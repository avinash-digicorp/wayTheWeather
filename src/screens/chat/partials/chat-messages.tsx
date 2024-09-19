import ChatMessageBox from '../partials2/ChatMessageBox';
import ReplyMessageBar from '../partials2/ReplyMessageBar';
import colors from 'theme';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage,
} from 'react-native-gifted-chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import messageData from '../partials2/message-data.json';
import {AssetSvg, ButtonView, FadeIn, Text} from 'components';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';
import Bubble from './chat-item';

const ChatMessages = props => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState('');
  const [longPressedMessageId, setLongPressedMessageId] = useState('');
  const insets = useSafeAreaInsets();

  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  useEffect(() => {
    setMessages([
      ...messageData.map(message => {
        return {
          _id: message.id,
          text: message.msg,
          reactions: ['👍', '👎'],
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? 'You' : 'Bob',
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: 'All your base are belong to us',
        reactions: ['😊'],
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any[]) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{backgroundColor: colors.background}}
        renderActions={() => (
          <View
            style={{
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              left: 5,
            }}>
            <AssetSvg name="location" />
          </View>
        )}
      />
    );
  };

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage],
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  const onLongPress = message => {
    setLongPressedMessageId(message._id);
  };
  return (
    <View
      style={{
        flex: 1,
        marginBottom: insets.bottom,
      }}>
      <FlatList
        data={messages}
        onSend={(messages: any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{_id: 1}}
        renderSystemMessage={props => (
          <SystemMessage
            {...props}
            wrapperStyle={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: colors.white,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              borderRadius: 15,
            }}
            textStyle={{color: colors.gray7}}
          />
        )}
        renderDay={props => {
          const isToday = moment(props?.currentMessage?.createdAt).isSame(
            new Date(),
            'day',
          );
          const isYesterday = moment(props?.currentMessage?.createdAt).isSame(
            new Date(),
            'day',
          );
          const timeFormat = isToday
            ? 'hh:mm A'
            : isYesterday
            ? 'Yesterday hh:mm A'
            : 'DD MM YYYY hh:mm A';
          const date = moment(props?.currentMessage?.createdAt).format(
            timeFormat,
          );
          return (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: colors.white,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                borderRadius: 15,
                alignSelf: 'center',
              }}>
              <Text text={date} className="text-xs" />
            </View>
          );
        }}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={100}
        textInputProps={styles.composer}
        renderItem={({item, index}) => (
          <Bubble
            item={item}
            index={index}
            key={item._id}
            onLongPress={onLongPress}
            longPressedMessageId={longPressedMessageId}
          />
        )}
        renderSend={props => (
          <View
            style={{
              height: 44,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              paddingHorizontal: 14,
            }}>
            {text === '' && (
              <>
                {/* <Ionicons name="camera-outline" color={colors.primary} size={28} />
                <Ionicons name="mic-outline" color={colors.primary} size={28} /> */}
              </>
            )}
            {text !== '' && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: 'center',
                }}>
                <AssetSvg name="right_arrow" />
              </Send>
            )}
          </View>
        )}
        scrollToBottomComponent={() => (
          <FadeIn>
            <ButtonView className="border bg-white border-gray-200 h-10 w-10 rounded-full items-center justify-center">
              <AssetSvg name="location" />
            </ButtonView>
          </FadeIn>
        )}
        renderInputToolbar={renderInputToolbar}
        renderChatFooter={() => (
          <>
            <ReplyMessageBar
              clearReply={() => setReplyMessage(null)}
              message={replyMessage}
            />
          </>
        )}
        // onLongPress={(context, message) => setReplyMessage(message)}
        renderMessage={props => (
          <ChatMessageBox
            {...props}
            setReplyOnSwipeOpen={setReplyMessage}
            updateRowRef={updateRowRef}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    elevation: 5,
    position: 'absolute',
  },
  composer: {
    backgroundColor: 'transparent',
  },
});

export default ChatMessages;
