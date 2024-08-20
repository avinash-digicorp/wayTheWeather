import React from 'react'
import {Image} from 'react-native'
import {AssetImageName, IProps} from './type.d'
import {ASSET_IMAGES} from 'assets/images'

export const AssetImage = (props: IProps) => {
  const {source, name, hide = false, resizeMode = 'contain'} = props
  if (hide) {
    return <React.Fragment />
  }
  const image = ASSET_IMAGES?.[name as AssetImageName]
  return (
    <Image
      source={source ? source : image}
      resizeMode={resizeMode}
      fadeDuration={1}
      {...props}
    />
  )
}
