import {StyleProp, ViewProps} from 'react-native';
import {defaultProps as inputDefaultProps, InputProps} from '../Input/type';

export type FormFieldRowProps<T extends InputProps> = {
  withMT?: boolean;
  withTouchRequiredToValidate?: boolean;
  elementFieldStyle?: StyleProp<InputProps>;
} & T &
  ViewProps;

export const defaultProps: FormFieldRowProps<InputProps> = {
  style: {},
  elementFieldStyle: {},
  withMT: true,
  withTouchRequiredToValidate: true,
  ...inputDefaultProps,
};
