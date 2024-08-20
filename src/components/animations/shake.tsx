import React, {Component} from 'react'
import {Animated, Easing} from 'react-native'
import {vibrate} from 'utils'

export class Shake extends Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.props?.ref?.(this)
  }

  componentWillUnmount() {
    this.props?.ref?.(undefined)
  }

  startShake = () => {
    this.animatedValue.setValue(0)
    vibrate()
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true
    }).start()
  }

  render() {
    const {children} = this.props
    const style = {
      transform: [
        {
          translateX: this.animatedValue.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [0, 20, 0, 20, 0]
          })
        }
      ]
    }
    return <Animated.View style={style}>{children}</Animated.View>
  }
}
