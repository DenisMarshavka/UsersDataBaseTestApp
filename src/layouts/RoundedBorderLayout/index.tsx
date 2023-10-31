import React from 'react';
import styled from 'styled-components/native';
import {RoundedBorderLayoutProps, defaultProps} from './type';

const RoundedBorderLayout: React.FC<RoundedBorderLayoutProps> = ({
  children,
  borderColor,
  borderRadius,
  backgroundColor,
  withTopBorder,
  withTopLeftBorderRadius,
  withTopRightBorderRadius,
  withBottomBorder,
  withBottomLeftBorderRadius,
  withBottomRightBorderRadius,
  withLeftBorder,
  withRightBorder,
  ...restProps
}) => (
  <Container
    borderColor={borderColor}
    borderRadius={borderRadius}
    backgroundColor={backgroundColor}
    withTopBorder={withTopBorder}
    withTopLeftBorderRadius={withTopLeftBorderRadius}
    withTopRightBorderRadius={withTopRightBorderRadius}
    withBottomBorder={withBottomBorder}
    withBottomLeftBorderRadius={withBottomLeftBorderRadius}
    withBottomRightBorderRadius={withBottomRightBorderRadius}
    withLeftBorder={withLeftBorder}
    withRightBorder={withRightBorder}
    {...restProps}>
    {children}
  </Container>
);

const Container = styled.View<RoundedBorderLayoutProps>`
  width: 100%;
  background-color: ${props => props.backgroundColor};
  border-width: 1px;
  border-style: solid;

  border-top-width: ${({withTopBorder}) => (withTopBorder ? 1 : 0)}px;
  border-bottom-width: ${({withBottomBorder}) => (withBottomBorder ? 1 : 0)}px;

  border-bottom-right-radius: ${({
    borderRadius,
    withBottomRightBorderRadius,
    withBottomBorder,
  }) =>
    withBottomBorder && withBottomRightBorderRadius ? `${borderRadius}px` : 0};
  border-bottom-left-radius: ${({
    borderRadius,
    withBottomBorder,
    withBottomLeftBorderRadius,
  }) =>
    withBottomBorder && withBottomLeftBorderRadius ? `${borderRadius}px` : 0};

  border-top-left-radius: ${({
    borderRadius,
    withTopBorder,
    withTopLeftBorderRadius,
  }) => (withTopBorder && withTopLeftBorderRadius ? `${borderRadius}px` : 0)};
  border-top-right-radius: ${({
    borderRadius,
    withTopRightBorderRadius,
    withTopBorder,
  }) => (withTopBorder && withTopRightBorderRadius ? `${borderRadius}px` : 0)};

  border-left-width: ${({withLeftBorder}) => (withLeftBorder ? 1 : 0)}px;
  border-right-width: ${({withRightBorder}) => (withRightBorder ? 1 : 0)}px;
`;

RoundedBorderLayout.defaultProps = defaultProps;
export default React.memo(RoundedBorderLayout);
