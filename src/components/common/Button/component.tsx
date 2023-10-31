import React from 'react';
import {ButtonProps, defaultProps} from './type';
import {Container, Text} from './style';

const Button: React.FC<ButtonProps> = ({
  marginTop,
  title,
  onPress,
  size,
  disable,
  lineHeight,
  fontSize,
  style,

  withOutline,
  withLeftChildren,
  withRightChildren,

  textStyle,
  children,
}): JSX.Element => (
  <Container
    size={size}
    marginTop={marginTop}
    title={title}
    onPress={!disable ? onPress : undefined}
    disable={disable}
    withOutline={withOutline}
    style={style}>
    {withLeftChildren ? children : null}
    <Text
      style={textStyle}
      withOutline={withOutline}
      lineHeight={lineHeight}
      fontSize={fontSize}>
      {title}
    </Text>

    {withRightChildren ? children : null}
  </Container>
);

Button.defaultProps = defaultProps;
export default React.memo(Button);
