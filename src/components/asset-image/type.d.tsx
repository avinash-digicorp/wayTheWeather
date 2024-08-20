import {ASSET_IMAGES} from 'assets/images/index'
import {ImageProps} from 'react-native'

export interface IProps extends ImageProps {
  /**
   * Handle the image will render or not.
   * @default false
   */
  hide?: boolean

  /**
   * Name of the image
   */
  name?: AssetImageName
}

export type AssetImageName = keyof typeof ASSET_IMAGES
