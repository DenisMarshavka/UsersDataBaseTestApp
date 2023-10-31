import React from 'react';
import {LabelProps, defaultProps} from './type';
import {Element, RequiredSymbol} from './style';

const Label: React.FC<LabelProps> = ({
  children,
  isRequired,
  style,
  ...restProps
}) => (
  <Element style={style} {...restProps}>
    {children}

    {isRequired ? <RequiredSymbol style={style}>*</RequiredSymbol> : null}
  </Element>
);

Label.defaultProps = defaultProps;
export default React.memo(Label);
