import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {CurvedTransition} from 'react-native-reanimated';
import {ReachAnimation} from '@/components';
import {keyboardReturnKeyType} from '@/utils/keyboard';
import colors from 'theme';
import {hasTextLength} from 'utils';

export default props => {
  return (
    <View className="w-11/12 justify-between self-center flex-row ">
      <Animated.View
        layout={CurvedTransition}
        style={[
          styles.inputContainer,
          styles.shadow,
          hasTextLength(props?.messageValue) && styles.inputContainerTexted,
        ]}>
        <TextInput
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
      {hasTextLength(props?.messageValue) && (
        <ReachAnimation>
          <TouchableOpacity
            style={[styles.shadow, styles.button]}></TouchableOpacity>
        </ReachAnimation>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
  inputContainerTexted: {marginRight: 20},
  button: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
});
