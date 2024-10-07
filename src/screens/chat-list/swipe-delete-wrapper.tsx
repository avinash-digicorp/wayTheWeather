import {Text} from 'components';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default props => {
  const {index, onClick} = props;
  const closeRow = index => {};
  const renderActions = () => {
    return (
      <View style={styles.rightContainer}>
        <Text className="text-green-600 text-xs ml-2" text="accept" />
        <Text className="text-xs ml-2 text-red-700" text="reject" />
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={renderActions}
      renderRightActions={renderActions}
      onSwipeableOpen={() => closeRow(index)}
      rightOpenValue={-100}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
