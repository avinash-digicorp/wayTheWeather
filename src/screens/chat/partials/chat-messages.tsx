import ChatMessageBox from '../partials2/ChatMessageBox';
import ReplyMessageBar from '../partials2/ReplyMessageBar';
import colors from 'theme';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import messageData from '../partials2/message-data.json';
import {AssetSvg, ButtonView, FadeIn, Text} from 'components';
import moment from 'moment';
import Bubble from './chat-item';
import {BlurView} from '@react-native-community/blur';

const ChatMessages = props => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [longPressedMessageId, setLongPressedMessageId] = useState('');
  const insets = useSafeAreaInsets();

  const [replyMessage, setReplyMessage] = useState(null);
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

  const onSend = useCallback((messages = []) => {}, []);

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
            setLongPressedMessageId={setLongPressedMessageId}
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
          </View>
        )}
        scrollToBottomComponent={() => (
          <FadeIn>
            <ButtonView className="border bg-white border-gray-200 h-10 w-10 rounded-full items-center justify-center">
              <AssetSvg name="location" />
            </ButtonView>
          </FadeIn>
        )}
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
