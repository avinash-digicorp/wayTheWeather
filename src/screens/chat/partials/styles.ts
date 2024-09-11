import {StyleSheet} from 'react-native';
import {isIosPlatform, SCREEN_WIDTH} from 'utils';
import {fonts} from 'utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    zIndex: 1,
  },
  innerHeaderContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatLabel: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fonts.bold,
  },
  iconsContainer: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  send: {
    left: -2,
    width: 22,
    height: 22,
    transform: [{rotate: '45deg'}],
  },
  inputContainer: {
    marginTop: 8,
    borderRadius: 20,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    paddingTop: isIosPlatform ? 8 : 2,
    paddingLeft: isIosPlatform ? 16 : 14,
    height: 66,
  },
  input: {
    textAlignVertical: 'top',
    height: 50,
    fontSize: 16,
    width: SCREEN_WIDTH - 136,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
    color: 'black',
  },
  sendContainer: {
    backgroundColor: '#033de6',
    position: 'absolute',
    padding: 12,
    borderRadius: 30,
    right: 16,
    top: isIosPlatform ? 10 : 11,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  messageInnerContainer: {
    flex: 1,
    borderColor: '#white',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'white',
  },
  messageName: {
    fontFamily: fonts.semiBold,
  },
  messageTime: {
    fontFamily: fonts.regular,
    color: '#a1a1a1',
  },
  messageRecipient: {
    marginRight: 12,
  },
  messageSender: {
    marginLeft: 12,
    marginRight: 8,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  message: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 20,
  },
  messageSenderBorder: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  messageRecipientBorder: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  avatar: {
    width: 36,
    height: 36,
  },
  capturedImg: {
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  blurBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  clonedMessage: {
    position: 'absolute',
    width: '100%',
    zIndex: 201,
    overflow: 'hidden',
  },
  emojiContainer: {
    zIndex: 100,
    width: SCREEN_WIDTH - 104,
    borderColor: '#white',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
    alignSelf: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  emojiSelectedContainer: {
    padding: 4,
    borderRadius: 8,
  },
  emoji: {
    width: 32,
    height: 32,
  },
  smallEmojiContainer: {
    backgroundColor: 'white',
    borderColor: '#white',
    borderWidth: 1,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    right: 12,
    bottom: -14,
    position: 'absolute',
  },
  smallEmoji: {
    width: 16,
    height: 16,
  },
});
