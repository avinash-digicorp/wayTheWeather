import ChatMessageBox from '../partials2/ChatMessageBox';
import ReplyMessageBar from '../partials2/ReplyMessageBar';
import colors from 'theme';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage,
} from 'react-native-gifted-chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import messageData from '../partials2/message-data.json';
import {AssetSvg} from 'components';

const ChatMessages = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();

  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  useEffect(() => {
    setMessages([
      ...messageData.map(message => {
        return {
          _id: message.id,
          text: message.msg,
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

  return (
    <View
      style={{
        flex: 1,
        marginBottom: insets.bottom,
      }}>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{
          _id: 1,
        }}
        renderSystemMessage={props => (
          <SystemMessage {...props} textStyle={{color: colors.gray5}} />
        )}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={100}
        textInputProps={styles.composer}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: '#000',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: '#fff',
                },
                right: {
                  backgroundColor: colors.primary3,
                },
              }}
            />
          );
        }}
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
        renderInputToolbar={renderInputToolbar}
        renderChatFooter={() => (
          <ReplyMessageBar
            clearReply={() => setReplyMessage(null)}
            message={replyMessage}
          />
        )}
        onLongPress={(context, message) => setReplyMessage(message)}
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
  composer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gray2,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
});

export default ChatMessages;
