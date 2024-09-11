import React from 'react';
import {TextInput, Pressable, StyleSheet} from 'react-native';
import {SearchMessageInput} from './types';
import {AssetSvg} from 'components';
import {fonts} from 'utils/fonts';
import {View} from 'react-native';
import colors from 'theme';

export default React.memo(
  ({input, setInput, inputRef, onPressSend}: SearchMessageInput) => {
    return (
      <Pressable
        style={styles.container}
        onPress={() => inputRef?.current?.focus()}>
        <View style={[styles.shadowContainer, styles.inputContainer]}>
          <TextInput
            ref={inputRef}
            multiline
            value={input}
            onChangeText={setInput}
            numberOfLines={2}
            placeholder="Message"
            placeholderTextColor={'#bbbbbb'}
            clearButtonMode="while-editing"
            style={styles.input}
          />
        </View>
        <Pressable
          style={[styles.shadowContainer, styles.buttonContainer]}
          onPress={() => onPressSend(input)}>
          <AssetSvg height={16} width={16} name="right_arrow" />
        </Pressable>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  shadowContainer: {
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
  container: {
    position: 'absolute',
    bottom: 30,
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  input: {
    fontSize: 16,
    width: '100%',
    paddingBottom: 5,
    includeFontPadding: !false,
    fontFamily: fonts.semiBold,
    color: 'black',
  },
  inputContainer: {
    backgroundColor: '#fff',
    width: '85%',
    paddingHorizontal: 20,
  },
  buttonContainer: {backgroundColor: colors.primary9, width: 50},
});
