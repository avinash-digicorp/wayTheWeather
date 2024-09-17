import React from 'react';
import {AssetSvg} from 'components';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {IMessage} from 'react-native-gifted-chat';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import colors from 'theme';

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: IMessage | null;
};

const ReplyMessageBar = ({clearReply, message}: ReplyMessageBarProps) => {
  if (message === null) return null;
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown}
      exiting={FadeOutDown}>
      <View style={styles.textContainer}>
        <Text style={styles.user}>{message?.user.name}</Text>
        <Text style={styles.message}>
          {message!.text.length > 40
            ? message?.text.substring(0, 40) + '...'
            : message?.text}
        </Text>
      </View>
      <View style={styles.crossContainer}>
        <TouchableOpacity onPress={clearReply}>
          <AssetSvg name="cross" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  crossContainer: {
    paddingRight: 10,
  },
  message: {color: colors.gray5, paddingLeft: 10, paddingTop: 5},
  user: {
    color: colors.primary,
    paddingLeft: 10,
    paddingTop: 5,
    fontWeight: '600',
    fontSize: 15,
  },
  container: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: colors.gray1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    height: 50,
    flexDirection: 'column',
    borderLeftWidth: 5,
    borderColor: colors.primary,
  },
});

export default ReplyMessageBar;
