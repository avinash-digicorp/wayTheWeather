import colors from 'theme';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import messageData from '../partials/message-data.json';
import {Text} from 'components';
import moment from 'moment';
import Bubble from './chat-item';
import ChatInput from './chat-input';

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
    <FlatList
      data={messages}
      inverted
      style={{borderWidth: 1, flex: 1}}
      keyExtractor={item => item._id}
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
    />
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
