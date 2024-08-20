import React, {useCallback, useRef, useState} from 'react'
import {StyleSheet, TextInput, View, Text, StatusBar} from 'react-native'
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'

import {VerificationCode} from './partials'
import {StatusType} from './partials/animated-code-number'
import {useAnimatedShake} from './partials/hooks/use-animated-shake'
import colors from 'theme'
import {useRoute} from '@react-navigation/native'

type VerificationCodeScreenProps = {
  correctCode: number
  onCorrectCode?: () => void
  onWrongCode?: () => void
}

export default ({
  correctCode = 1234,

  onWrongCode
}: VerificationCodeScreenProps) => {
  const [code, setCode] = useState<number[]>([])
  const route = useRoute()
  const onCorrectCode = route.params?.onSuccess
  const verificationStatus = useSharedValue<StatusType>('inProgress')
  const {height: keyboardHeight} = useAnimatedKeyboard()

  const rKeyboardAvoidingViewStyle = useAnimatedStyle(() => {
    return {transform: [{translateY: -keyboardHeight.value / 2}]}
  }, [keyboardHeight])
  const {shake, rShakeStyle} = useAnimatedShake()
  const invisibleTextInputRef = useRef<TextInput>(null)
  const maxCodeLength = correctCode.toString().length

  const resetCode = useCallback(() => {
    setTimeout(() => {
      verificationStatus.value = 'inProgress'
      setCode([])
      invisibleTextInputRef.current?.clear()
    }, 1000)
  }, [verificationStatus])

  const onWrongCodeWrapper = useCallback(() => {
    verificationStatus.value = 'wrong'
    shake()
    resetCode()
    onWrongCode?.()
  }, [onWrongCode, resetCode, shake, verificationStatus])

  const onCorrectCodeWrapper = useCallback(() => {
    verificationStatus.value = 'correct'
    resetCode()
    onCorrectCode?.()
  }, [onCorrectCode, resetCode, verificationStatus])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={rKeyboardAvoidingViewStyle}>
        <View>
          <Text style={styles.headerText}>Enter Code</Text>
        </View>
        <Animated.View style={[styles.codeContainer, rShakeStyle]}>
          <VerificationCode
            status={verificationStatus}
            code={code}
            maxLength={maxCodeLength}
          />
        </Animated.View>
      </Animated.View>
      <TextInput
        keyboardAppearance="dark"
        ref={invisibleTextInputRef}
        onChangeText={text => {
          const newCode = text.split('').map(item => +item)
          if (newCode.length > maxCodeLength) {
            return
          }
          setCode(newCode)

          if (newCode.join('') === correctCode.toString()) {
            onCorrectCodeWrapper()
            return
          }
          if (newCode.length === maxCodeLength) {
            onWrongCodeWrapper()
            return
          }
          verificationStatus.value = 'inProgress'
        }}
        keyboardType="number-pad"
        autoFocus
        style={styles.invisibleInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: colors.gray8,
    fontSize: 30,
    marginBottom: 30,
    marginLeft: 18
  },
  codeContainer: {
    width: '100%'
  },
  invisibleInput: {
    position: 'absolute',
    bottom: -50
  }
})
