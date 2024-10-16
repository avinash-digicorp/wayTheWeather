import React from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ASSET_IMAGES} from 'assets/images';
import ChatHeader from './partials/chat-header';
import ChatInput from './partials/chat-input';
import ChatMessages from './partials/chat-messages';
import {useChat} from './chat-container';
import _ from 'lodash';
import {RemindModal} from 'components/common';

export const Chat = () => {
  const props = useChat();
  const {setSelectedMessage} = props;
  return (
    <View className="items-center justify-between" style={styles.container}>
      <Pressable onPress={() => setSelectedMessage(null)} style={styles.bg}>
        <ImageBackground
          source={ASSET_IMAGES.chatBg}
          resizeMode="repeat"
          style={{width: '100%', height: '100%'}}
        />
      </Pressable>
      <ChatHeader {...props} />
      <KeyboardAvoidingView style={styles.container2}>
        <ChatMessages {...props} />
        <ChatInput {...props} />
      </KeyboardAvoidingView>
      <RemindModal planExpiryDate="2024-10-23" />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '500%',
    height: '500%',
    transform: [{rotate: '-20deg'}],
  },
  container: {width: '100%', height: '100%', justifyContent: 'space-between'},
  container2: {
    paddingBottom: 30,
    flex: 1,
    width: '100%',
  },
});
