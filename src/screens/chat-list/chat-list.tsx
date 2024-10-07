import * as React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ChatListItem from './chat-item';

export default () => {
  const deleteItem = ({item, index}) => {
    console.log(item, index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatListData}
        renderItem={v => <ChatListItem {...v} onClick={deleteItem} />}
        keyExtractor={item => item.id}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const chatListData = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: "Hey, how's it going?",
    lastMessageStatus: 'sent',
    unreadCount: 2,
    lastMessageTime: '10:45 AM',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    isMine: true, // Indicate if the message is from the user
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastMessage: 'Let’s meet tomorrow.',
    lastMessageStatus: 'read',
    unreadCount: 0,
    lastMessageTime: 'Yesterday',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    isMine: false,
  },
  {
    id: 3,
    name: 'Alex Johnson',
    lastMessage: 'Okay, see you soon.',
    lastMessageStatus: 'delivered',
    unreadCount: 1,
    lastMessageTime: '8:30 PM',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    isMine: false,
  },
];
