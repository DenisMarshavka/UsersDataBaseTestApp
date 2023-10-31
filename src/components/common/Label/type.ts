import {StyleProp, TextStyle} from 'react-native';

export interface LabelProps {
  children: React.ReactNode;
  isRequired?: boolean;
  isBold?: boolean;
  style?: StyleProp<TextStyle>;
}
export const defaultProps: LabelProps = {
  children: 'Label',
  isRequired: false,
  isBold: false,
  style: {},
};
