import {ViewProps} from 'react-native';
import {IUser} from '../../../types/models/IUser';

export interface UsersListProps extends ViewProps {
  data: IUser[];
  isError: boolean;
  isAnyDataLoading: boolean;
  isFirstRequest: boolean;
  isDataLoading: boolean;
  isMoreLoading: boolean;
  onRefreshData: () => void;
  onMoreData: () => void;
}

export const defaultProps: UsersListProps = {
  data: [],
  isError: false,
  isAnyDataLoading: true,
  isFirstRequest: true,
  isDataLoading: true,
  isMoreLoading: false,
  onRefreshData: () => null,
  onMoreData: () => null,
};
