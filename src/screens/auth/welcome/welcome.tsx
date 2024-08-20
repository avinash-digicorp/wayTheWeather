import React, {useEffect, useRef, useState} from 'react'
import {Button, StatusBar, View} from 'react-native'
import styles from './styles'
import {navigateTo, routes} from '@/navigation'
import {AnimatedIcon, AssetImage, Text, useToast} from 'components'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'utils'
import FullScreenLoading from './full-screen-loading'

export default () => {
  const {showToast} = useToast()
  const value = useRef(0)
  const [id, setId] = useState<number>(0)
  const [visible, setVisible] = useState(false)

  const onPress = () => navigateTo(routes.LOGIN)
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <AssetImage className="w-4/6 self-center h-200" name="logo" />
      <View style={styles.container}>
        <Text style={styles.title} className="text-primary mb-20">
          {'Welcome Screen'}
        </Text>
        <Button onPress={onPress} title="Login >>" />
      </View>
      {/* <FullScreenLoading visible={visible} /> */}
    </View>
  )
}
