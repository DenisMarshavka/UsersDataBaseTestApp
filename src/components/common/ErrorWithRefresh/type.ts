import {TextStyle, ViewProps} from 'react-native';
import {defaultErrorMessage} from '../../../utils';

export interface ErrorWithRefreshProps extends ViewProps {
  withRefreshBtn?: boolean;
  refreshRequest?: () => void;
  ErrorElement?: JSX.Element;
  message?: string;
  withMaxHeight?: boolean;
  textStyle?: TextStyle;
}

export const defaultProps: ErrorWithRefreshProps = {
  withRefreshBtn: true,
  refreshRequest: undefined,
  ErrorElement: undefined,
  message: defaultErrorMessage,
  withMaxHeight: true,
  textStyle: {},
};
