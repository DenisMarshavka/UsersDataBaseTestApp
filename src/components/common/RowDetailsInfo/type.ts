import {StyleProp, ViewProps, ViewStyle} from 'react-native';

export interface RowDetailsInfoProps extends ViewProps {
  label: string;
  text: string;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
}

export const defaultProps: RowDetailsInfoProps = {
  label: 'Label',
  text: '-',
  numberOfLines: 1,
  style: undefined,
};
