import {StyleProp, ViewStyle} from 'react-native';
import {IProps as ButtonViewProps} from '@/components/button-view/type.d';
import {ASSET_SVGS} from './svg-icons';

export interface AssetSvgProps {
  /**
   * Name of SVG icon.
   */
  name?: keyof typeof ASSET_SVGS;

  preserveAspectRatio?: string;

  /**
   * Color of fillable SVG icon.
   */
  fill?: string;

  /**
   * Width of SVG icon.
   */
  width?: number | string;

  /**
   * Height of SVG icon.
   */
  height?: number | string;

  /**
   * Styling for the icon container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Handle the icon will render or not.
   * @default false
   */
  hide?: boolean;

  /**
   * Additional props to pass to the ButtonView.
   */
  buttonViewProps?: ButtonViewProps;

  /**
   * Handle additional non-existing type.
   */
  [key: string]: string | number | any;
}
