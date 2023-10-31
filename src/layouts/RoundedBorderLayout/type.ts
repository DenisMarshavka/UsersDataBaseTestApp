import {ViewProps} from 'react-native';
import {AppColors, AppSizes} from '../../theme';

export interface RoundedBorderLayoutProps extends ViewProps {
  backgroundColor?: AppColors;
  children: React.ReactNode;

  borderColor?: AppColors;
  borderRadius?: AppSizes;

  withTopBorder?: boolean;
  withTopLeftBorderRadius?: boolean;
  withTopRightBorderRadius?: boolean;

  withBottomBorder?: boolean;
  withBottomLeftBorderRadius?: boolean;
  withBottomRightBorderRadius?: boolean;

  withLeftBorder?: boolean;
  withRightBorder?: boolean;
}

export const defaultProps: RoundedBorderLayoutProps = {
  backgroundColor: AppColors.WHITE,
  children: null,

  borderColor: AppColors.GRAY_LIGHTEN,
  borderRadius: AppSizes.RADIUS_SMALL,

  withTopBorder: true,
  withTopLeftBorderRadius: true,
  withTopRightBorderRadius: true,

  withBottomBorder: true,
  withBottomLeftBorderRadius: true,
  withBottomRightBorderRadius: true,

  withLeftBorder: true,
  withRightBorder: true,
};
