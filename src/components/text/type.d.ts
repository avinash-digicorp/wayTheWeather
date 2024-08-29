import {LocalizationKeys} from 'locales/use-translation';
import {TextProps} from 'react-native';

export interface ITextProps extends TextProps {
  text?: string;
  tx?: LocalizationKeys;
  txOptions?: any;
  hide?: boolean;
}
