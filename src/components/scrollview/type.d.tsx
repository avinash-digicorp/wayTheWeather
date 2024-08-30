import {ScrollViewProps} from 'react-native';

export interface IProps extends ScrollViewProps {
  /**
   * Handle the component will render or not.
   * @default false
   */
  hide?: boolean;

  /**
   * Handle additional non-existing type.
   */
  [key: string]: string | number | any;

  /**
   * Type of scrollView.
   */
  type?: 'normal' | 'gesture';
}
