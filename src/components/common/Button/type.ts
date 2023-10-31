import React from 'react';
import {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewProps,
} from 'react-native';

export type ButtonSize = 'lg' | 'xs';

export interface ButtonProps extends ViewProps {
  marginTop?: number;
  title: string;
  onPress?: (props: GestureResponderEvent | any) => void;
  size?: ButtonSize;
  lineHeight?: number;
  fontSize?: number;
  disable?: boolean;
  children?: React.ReactNode;

  withOutline?: boolean;
  withLeftChildren?: boolean;
  withRightChildren?: boolean;

  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<PressableProps>;
}

export const defaultProps: ButtonProps = {
  marginTop: 0,
  title: '',
  onPress: () => null,
  size: 'lg',
  lineHeight: undefined,
  fontSize: undefined,
  disable: false,
  children: null,

  withOutline: false,
  withLeftChildren: true,
  withRightChildren: false,

  textStyle: {},
  style: {},
};
