import {ViewProps} from 'react-native';
import {AppColors, AppSizes} from '../../../theme';

export interface MoreDataLoadingProps extends ViewProps {
  mT?: number;
  active: boolean;
  color?: AppColors;
  size?: number | 'small' | 'large';
}

export const defaultProps: MoreDataLoadingProps = {
  color: AppColors.PRIMARY,
  mT: AppSizes.MARGIN_SMALL,
  active: false,
  size: 'small',
};
