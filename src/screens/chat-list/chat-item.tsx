import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import SwipeDeleteWrapper from './swipe-delete-wrapper';
import {haptic} from 'utils';

const ChatListItem = props => {
  const {item, isOwn, selectedItems, setSelectedItems} = props;
  const onLongPress = () => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter(id => id != item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
    haptic();
  };
  const onPress = () => {
    if (selectedItems.length) {
      onLongPress();
      return;
    }
  };
  const isSelected = selectedItems.includes(item.id);
  return (
    <SwipeDeleteWrapper {...props}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.chatItem}>
        <View>
          <Image
            source={{uri: item.profileImage}}
            style={styles.profileImage}
          />
          {isSelected && (
            <View className="absolute bottom-0 -right-2 bg-primary border border-white w-5 h-5 rounded-full items-center justify-center">
              <Text className="text-xs">{'✔✔'}</Text>
            </View>
          )}
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            {!isOwn && (
              <Text style={styles.chatTime}>{item.lastMessageTime}</Text>
            )}
          </View>
          <View style={styles.chatFooter}>
            {isOwn && <Text>{'✔✔'}</Text>}
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            {item.unreadCount > 0 && !isOwn && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </SwipeDeleteWrapper>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  tickIcon: {
    marginRight: 5,
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    position: 'absolute',
    left: 0,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatListItem;
