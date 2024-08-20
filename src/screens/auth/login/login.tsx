import React from 'react'
import {Text} from '@/components'
import {keyboardReturnKeyType, keyboardType} from '@/utils/keyboard'
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import colors from 'theme'
import useLoginContainer from './login-container'
import {GoogleSigninButton} from '@react-native-google-signin/google-signin'
import {useSelector} from 'react-redux'
import {RootState} from 'store'

export default () => {
  const {googleSignIn, onSubmit, mobile, setMobile} = useLoginContainer()
  const {loading} = useSelector((state: RootState) => state.auth)

  const RENDER_COMPONENT = (
    <View
      style={styles.card}
      className="items-center w-11/12 mb-10 border-w-1 px-4 py-8 rounded-16 border-gray-100 justify-between bg-gray-50">
      <TextInput
        value={mobile}
        onChangeText={setMobile}
        placeholder={'Enter Phone Number'}
        className="px-4 w-full border-gray-light-300 bg-white border border-gray-200 rounded-md flex-row justify-center items-center h-14"
        keyboardType={keyboardType.PHONE}
        maxLength={10}
        returnKeyType={keyboardReturnKeyType.GO}
      />

      <Button disabled={loading} onPress={onSubmit} title="Login" />
      <Text
        className="my-8 text-center text-gray-500"
        text="----------- OR -----------"
      />
      <GoogleSigninButton onPress={googleSignIn} />
    </View>
  )

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        bounces={false}
        style={{flex: 1}}
        contentContainerStyle={{height: '100%', justifyContent: 'center'}}
        className="flex-1">
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          behavior="padding"
          className="flex-1">
          <View className="flex-1 w-full self-center items-center justify-between">
            <View className="items-center"></View>
            <Text
              className="px-5 py-2 text-center font-weight-600 text-gray-600 size-24"
              text={'Login'}
            />
            {RENDER_COMPONENT}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowColor: colors.gray8,
    borderRadius: 16,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
    alignSelf: 'center'
  }
})
