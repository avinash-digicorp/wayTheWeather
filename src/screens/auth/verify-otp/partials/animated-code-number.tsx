import {useCallback} from 'react'
import {StyleSheet} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  FlipInXDown,
  FlipOutXDown,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import colors from 'theme'

export type StatusType = 'inProgress' | 'correct' | 'wrong'

export type AnimatedCodeNumberProps = {
  code?: number
  highlighted: boolean
  status: SharedValue<StatusType>
}

export const AnimatedCodeNumber: React.FC<AnimatedCodeNumberProps> = ({
  code,
  highlighted,
  status
}) => {
  const getColorByStatus = useCallback(
    (vStatus: StatusType) => {
      'worklet'
      if (highlighted) return colors.primary
      if (vStatus === 'correct') {
        return '#22bb33'
      }
      if (vStatus === 'wrong') {
        return '#bb2124'
      }
      return '#2E2B2E'
    },
    [highlighted]
  )

  const rBoxStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(getColorByStatus(status.value))
    }
  }, [getColorByStatus])

  return (
    <Animated.View style={[styles.container, rBoxStyle]}>
      {code != null && (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(250)}>
          <Animated.Text
            entering={FlipInXDown.duration(200)
              .easing(Easing.bezier(0, 0.75, 0.5, 0.9).factory())
              .build()}
            exiting={FlipOutXDown.duration(200)
              .easing(Easing.bezier(0.6, 0.1, 0.4, 0.8).factory())
              .build()}
            style={[styles.text, highlighted && {color: colors.primary}]}>
            {code}
          </Animated.Text>
        </Animated.View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '80%',
    borderWidth: 2,
    borderRadius: 20,
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue'
  },
  text: {
    color: colors.gray7,
    fontSize: 40,
    fontFamily: 'FiraCode'
  }
})
