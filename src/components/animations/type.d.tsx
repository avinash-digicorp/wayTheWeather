export interface IProps {
  delay?: number
  duration?: number
  index?: number
  friction?: number
  children?: any
  refresh?: boolean
  show?: boolean
  className?: string
  rightToLeft?: boolean
  scale?: number
  opacity?: number
}

export interface IStates {
  /**
   * Animate the touchable list to a new opacity.
   * @default 0
   */
  opacity: any
}
