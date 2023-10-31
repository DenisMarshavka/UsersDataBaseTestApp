import {TextProps} from 'react-native';
import {FontSize} from '../../../theme';

export interface ErrorTextProps extends TextProps {
  mT?: number;
  fontSize?: number;
}

export const defaultProps: ErrorTextProps = {
  mT: 0,
  fontSize: FontSize.medium.fontSize,
};
