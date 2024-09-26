import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import messageData from '../partials/message-data.json';
import Bubble from './chat-item';
import {Message} from './types';
import moment from 'moment';

const ChatMessages = props => {
  const {
    messages,
    setMessages,
    selectedMessage,
    reactionChanges,
    setSelectedMessage,
  } = props;
  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    const groupedMessages = groupMessagesByDate(messages);
    setMessageList(groupedMessages);
  }, [messages]);
  return (
    <FlatList
      data={messageList}
      inverted
      keyExtractor={(item: Message) => item?.id}
      renderItem={({item, index}) => {
        return (
          <Bubble
            item={item}
            index={index}
            key={item?.id}
            reactionChanges={reactionChanges}
            setSelectedMessage={setSelectedMessage}
            selectedMessage={selectedMessage}
          />
        );
      }}
      contentContainerStyle={{flexDirection: 'column-reverse'}}
    />
  );
};

const groupMessagesByDate = (messages: Message[]) => {
  const groupedMessages = [];
  let lastDate = null;

  messages.forEach(message => {
    const messageDate = moment(message.createdAt).format('MMMM D, YYYY');
    if (messageDate !== lastDate) {
      groupedMessages.push({type: 'date', date: messageDate});
      lastDate = messageDate;
    }
    groupedMessages.push({...message, type: 'message'});
  });

  return groupedMessages;
};

export default ChatMessages;
