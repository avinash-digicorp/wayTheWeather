import React from 'react'
import {StyleSheet} from 'react-native'
import Animated from 'react-native-reanimated'
import {FadeList} from '@/components'
import {random} from 'lodash'

const duration = 400

export default props => {
  const {index, item, renderItem: RenderItem} = props
  const delay = index.toString().slice(-1) * 50

  return (
    <Animated.View>
      <FadeList class={props?.class} delay={delay} duration={duration}>
        <RenderItem item={item} />
      </FadeList>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowRadius: 7,
    elevation: 3
  }
})
