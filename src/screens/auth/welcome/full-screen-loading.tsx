import React, {useEffect, useRef, useState} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {AnimatedIcon, AssetImage} from 'components'

export default ({visible}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const fadeAnim2 = useRef(new Animated.Value(1)).current
  const scaleAnim = useRef(new Animated.Value(1.3)).current
  const [renderModel, setRenderModel] = useState(true)
  useEffect(() => {
    if (!visible) return

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start()

    return () => {
      Animated.parallel([
        Animated.timing(fadeAnim2, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true
        })
      ]).start(() => setRenderModel(false))
    }
  }, [visible])
  if (!renderModel) return null
  return (
    <Animated.View
      style={{opacity: fadeAnim2}}
      className="absolute w-full h-full bg-white items-center justify-center">
      <Animated.View
        style={{opacity: fadeAnim, transform: [{scale: scaleAnim}]}}
        className="w-full h-full items-center justify-center">
        <View className="absolute z-999 w-full h-full">
          <AnimatedIcon
            name="lineBackground"
            autoPlay
            resizeMode="cover"
            style={styles.lineBg}
          />
        </View>
        <View className="gap-10 w-full h-full justify-evenly">
          <AssetImage name="logo" className="w-3/6 h-auto self-center" />
          <AnimatedIcon
            name="lineLoading"
            autoPlay
            loop
            style={{width: '50%'}}
          />
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  lineBg: {
    alignSelf: 'center',
    width: '100%',
    opacity: 0.5,
    transform: [{rotate: '135deg'}, {scale: 1}],
    height: '100%'
  }
})
