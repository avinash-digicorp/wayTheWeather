import {Image, StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import {Reaction} from 'react-native-reactions';
import _ from 'lodash';

interface EmojiItemProp {
  id: number;
  emoji: React.ReactNode | string | number;
  title: string;
}

interface CardProps extends CardItemsProps {
  index?: number;
  selectedEmoji?: EmojiItemProp;
  setSelectedEmoji?: (e: EmojiItemProp | undefined) => void;
  onShowDismissCard?: (e?: boolean) => void;
  isScrollEnable?: boolean;
}

interface CardItemsProps {
  id?: string;
  image?: string;
  title?: string;
}

const CardComponent = ({index, onShowDismissCard, ...item}: CardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.postImageContainer}>
        <Image source={{uri: item?.image}} style={styles.postImage} />
      </View>
      <View style={styles.line} />
      <View style={styles.bottomContainer}>
        <Reaction
          items={ReactionItems}
          onTap={setSelectedEmoji}
          itemIndex={index}
          onShowDismissCard={onShowDismissCard}>
          <Text>{selectedEmoji ? selectedEmoji?.emoji : 'Like'}</Text>
        </Reaction>
        <Text>Share</Text>
      </View>
    </View>
  );
};

export const Card = CardComponent;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
  },
  postImageContainer: {
    alignItems: 'center',
    zIndex: -1,
  },
  postImage: {
    width: '100%',
    height: 200,
    zIndex: -1,
    resizeMode: 'center',
  },
  line: {
    borderWidth: 0.3,
    borderColor: '#c9cdd0',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginHorizontal: 20,
  },
});
