import React from 'react';
import {ErrorTextProps, defaultProps} from './type';
import {Content} from './style';

const ErrorText: React.FC<ErrorTextProps> = ({
  children,
  mT,
  fontSize,
  style,
}): JSX.Element => (
  <Content mT={mT} fontSize={fontSize} style={style}>
    {children}
  </Content>
);

ErrorText.defaultProps = defaultProps;
export default React.memo(ErrorText);
