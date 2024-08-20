import {StyleSheet, View} from 'react-native'
import {useState} from 'react'
import {LoadingButton} from 'components'
import {ActivityStatus} from 'components/loading-button/loading-button'
import colors from 'theme'

export default () => {
  const [currentStatus, setCurrentStatus] = useState<ActivityStatus>('loading')

  const onPress = async () => {
    setCurrentStatus('loading')
    setTimeout(() => {
      setCurrentStatus('success')
    }, 3000)
  }

  return (
    <View style={styles.container}>
      <LoadingButton
        status={currentStatus}
        onPress={onPress}
        style={{borderRadius: 25}}
        colorFromStatusMap={{
          idle: colors.gray9,
          loading: colors.gray6,
          success: colors.green,
          error: colors.danger
        }}
        titleFromStatusMap={{
          idle: 'Continue',
          loading: 'Submitting',
          success: 'Success',
          error: 'Declined'
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
