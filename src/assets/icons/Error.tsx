import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {AppColors} from '../../theme';

const ErrorIcon = (props: SvgProps) => (
  <Svg width={15} height={15} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.268 7a6.4 6.4 0 1 1-12.8 0 6.4 6.4 0 0 1 12.8 0Zm-5.6 3.2a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Zm-.8-7.2a.8.8 0 0 0-.8.8V7a.8.8 0 0 0 1.6 0V3.8a.8.8 0 0 0-.8-.8Z"
      fill={AppColors.DANGER}
    />
  </Svg>
);

export default ErrorIcon;
