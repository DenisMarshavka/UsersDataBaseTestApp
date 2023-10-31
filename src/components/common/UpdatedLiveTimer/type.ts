import {StyleProp, ViewProps, ViewStyle} from 'react-native';

export interface UpdatedLiveTimerProps extends ViewProps {
  updatedDate: string;
  isLive?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const defaultProps: UpdatedLiveTimerProps = {
  updatedDate: new Date().toString(),
  isLive: false,
  style: undefined,
};
