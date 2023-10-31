import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {AppColors} from '../../theme';

const defaultProps: SvgProps = {
  fill: AppColors.GRAY,
};

const ArrowDownIcon = ({fill, ...restProps}: SvgProps) => (
  <Svg width={16} height={10} {...restProps}>
    <Path
      d="m1 1 7 7 7-7"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

ArrowDownIcon.defaultProps = defaultProps;
export default ArrowDownIcon;
