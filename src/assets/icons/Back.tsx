import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {AppColors} from '../../theme';

const defaultProps: SvgProps = {
  fill: AppColors.GRAY_DARKEN,
  height: 24,
  width: 10,
};

const BackIcon = ({fill, height, width, ...restProps}: SvgProps) => (
  <Svg height={height} width={width} {...restProps}>
    <Path
      d="M11.5.5 1 11l10.5 10.5"
      stroke={fill}
      fill={fill}
      strokeLinecap="round"
    />
  </Svg>
);

BackIcon.defaultProps = defaultProps;
export default BackIcon;
