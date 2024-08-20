import {SwipeButton, Text} from 'components'
import React, {useState} from 'react'

export const SwipeToggle = () => {
  const [value, setToggleState] = useState(false)
  const handleToggle = value => setToggleState(value)
  return <SwipeButton value={value} onToggle={handleToggle} />
}
