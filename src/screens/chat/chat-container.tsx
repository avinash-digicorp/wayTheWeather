import {useState} from 'react';
import {EmojiType, Message} from './partials/types';
import {uniqueId} from 'lodash';
import {hasObjectLength, hasTextLength} from 'utils';
import moment from 'moment';
import messageJson from './partials/message-data.json';

export const useChat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(
    messageJson?.map?.(i => i) ?? [],
  );
  const [messageValue, setMessageValue] = useState<string>('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const onSubmit = (): void => {
    setLoading(true);
    setLoading(false);
  };
  const addMessage = () => {
    if (!hasTextLength(messageValue)) return;
    const newMessage: Message = {
      id: uniqueId(),
      text: messageValue?.trim?.(),
      createdAt: moment().toLocaleString(),
      reactions: [],
      user: {id: 0},
    };

    setMessages([...messages, newMessage]);
    setMessageValue('');
    getRandomMessage();
  };
  const getRandomMessage = () => {
    // TODO : typing indicator
    const randomText = ['Wow!', 'That is nice', 'Cool!'];
    const newMessage: Message = {
      id: uniqueId(),
      text: randomText[Math.floor(Math.random() * randomText.length)],
      createdAt: moment().toLocaleString(),
      reactions: [],
      user: {id: 1},
    };
    setTimeout(() => {
      setMessages(val => [...val, newMessage]);
    }, 5000);
  };
  const reactionChanges = (reaction: string, id: string) => {
    const messageList: Message[] = messages.map((message: Message) => {
      if (message.id === id) {
        let reactions = [...(message?.reactions || [])];
        const emojiExists = message?.reactions?.find?.(
          (emoji: EmojiType) => emoji.userId === 0,
        );

        if (hasObjectLength(emojiExists)) {
          if (reaction === emojiExists?.emoji) {
            reactions = [
              ...message.reactions.filter(item => item !== emojiExists),
            ];
          } else {
            reactions = message.reactions?.map?.((item: EmojiType) => {
              if (item?.userId === 0) {
                return {...item, emoji: reaction};
              }
              return item;
            });
          }
        } else {
          reactions.push({userId: 0, emoji: reaction});
        }

        return {...message, reactions};
      }
      return message;
    });

    setMessages(messageList);
  };
  const values = {loading, messageValue, selectedMessage, messages};
  const handlers = {
    setLoading,
    onSubmit,
    setMessageValue,
    setSelectedMessage,
    setMessages,
    addMessage,
    reactionChanges,
  };

  return {...values, ...handlers};
};
