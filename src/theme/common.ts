import {DefaultTheme} from 'styled-components';
export * from './fonts';
export * from '../utils/platform';
import AppColors from './appColors';
import AppSizes from './appSizes';

export const theme: DefaultTheme = {
  colors: {
    background: AppColors.BACKGROUND,
    white: AppColors.WHITE,

    dark: AppColors.DARK,
    dark_lighten: AppColors.DARK_LIGHTEN,

    primary: AppColors.PRIMARY,

    gray_lighten: AppColors.GRAY_LIGHTEN,
    gray: AppColors.GRAY,
    gray_darken: AppColors.GRAY_DARKEN,

    danger: AppColors.DANGER,
    transparent: AppColors.TRANSPARENT,
  },
  offsets: {
    m: AppSizes.M,
    mm: AppSizes.MM,
    l: AppSizes.L,
    xxl: AppSizes.XXL,
    small: AppSizes.SMALL,
    large: AppSizes.LARGE,

    padding_small: AppSizes.PADDING_SMALL,
    padding_horizontal: AppSizes.PADDING_HORIZONTAL,

    margin_small: AppSizes.MARGIN_SMALL,
    margin: AppSizes.MARGIN,
    margin_xs: AppSizes.MARGIN_XS,
    margin_xl: AppSizes.MARGIN_XL,

    radius_small: AppSizes.RADIUS_SMALL,
    radius: AppSizes.RADIUS,

    min_input_height: AppSizes.MIN_INPUT_HEIGHT,
  },
};

export {AppSizes, AppColors};
