import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Animated, {CurvedTransition} from 'react-native-reanimated';
import {AssetSvg, ReachAnimation} from '@/components';
import {keyboardReturnKeyType} from '@/utils/keyboard';
import colors from 'theme';

export default props => {
  return (
    <View className="w-11/12 justify-between items-end self-center flex-row ">
      <Animated.View
        layout={CurvedTransition}
        style={[
          styles.inputContainer,
          styles.shadow,
          styles.inputContainerTexted,
        ]}>
        <TextInput
          multiline
          meta={{}}
          hideIcon
          placeholder={'Type a message...'}
          placeholderTextColor={colors.gray7}
          input-className="text-gray-600 size-sm"
          className="px-15"
          container-className="mb-0"
          activeEffect={false}
          returnKeyType={keyboardReturnKeyType.SEARCH}
          value={props?.messageValue}
          onChangeText={props?.setMessageValue}
        />
      </Animated.View>
      {/* {hasTextLength(props?.messageValue) && ( */}
      <ReachAnimation>
        <TouchableOpacity
          onPress={props?.addMessage}
          style={[styles.shadow, styles.button]}>
          <AssetSvg name="sent" width={24} height={24} style={styles.sent} />
        </TouchableOpacity>
      </ReachAnimation>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  sent: {marginLeft: 3},
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 30,
    minHeight: 50,
    paddingBottom: 2,
    maxHeight: 200,
    paddingHorizontal: 15,
  },
  inputContainerTexted: {marginRight: 20},
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
});
