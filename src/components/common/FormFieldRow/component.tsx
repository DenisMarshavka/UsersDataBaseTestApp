import React from 'react';

import {FormFieldRowProps, defaultProps} from './type';
import {Input} from '../index';
import {InputProps} from '../Input/type';
import {Container} from './style';

const FormFieldRow: React.FC<FormFieldRowProps<InputProps>> = ({
  style,
  withMT,
  elementFieldStyle,
  ...restProps
}): JSX.Element => (
  <Container withMT={withMT} style={style}>
    <Input {...restProps} style={elementFieldStyle} />
  </Container>
);

FormFieldRow.defaultProps = defaultProps;
export default React.memo(FormFieldRow);
