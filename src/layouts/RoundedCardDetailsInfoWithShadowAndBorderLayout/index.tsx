import React from 'react';
import {View, ViewProps} from 'react-native';
import styled from 'styled-components/native';

import RoundedBorderLayout from '../RoundedBorderLayout';
import {
  defaultProps as roundedBorderLayoutDefaultProps,
  RoundedBorderLayoutProps,
} from '../RoundedBorderLayout/type';
import ShadowLightenLayout, {
  ShadowLightenLayoutProps,
} from '../ShadowLightenLayout';

export interface RoundedCardDetailsInfoWithShadowAndBorderLayoutProps
  extends ViewProps {
  marginBottom?: number;
  bottomSectionProps?: ViewProps;
  shadowProps?: ShadowLightenLayoutProps;
  borderProps?: RoundedBorderLayoutProps;
  ref?: React.RefObject<View>;
}

const defaultProps: RoundedCardDetailsInfoWithShadowAndBorderLayoutProps = {
  marginBottom: 0,
  bottomSectionProps: {},
  shadowProps: {},
  borderProps: {...roundedBorderLayoutDefaultProps},
  ref: undefined,
};

const RoundedCardDetailsInfoWithShadowAndBorderLayout: React.FC<
  RoundedCardDetailsInfoWithShadowAndBorderLayoutProps
> = ({
  marginBottom,
  bottomSectionProps,
  shadowProps,
  borderProps,

  children,
  style,
}): React.ReactElement => {
  const commonShadowContainerViewStyle = React.useMemo(
    () => ({marginBottom}),
    [marginBottom],
  );

  const shadowContainerViewStyle = React.useMemo(
    () =>
      shadowProps?.containerStyle
        ? [shadowProps.containerStyle, commonShadowContainerViewStyle]
        : commonShadowContainerViewStyle,
    [commonShadowContainerViewStyle, shadowProps],
  );

  return (
    <ShadowLightenLayout
      {...shadowProps}
      containerStyle={shadowContainerViewStyle}
      style={style}>
      <RoundedBorderLayout {...borderProps}>
        <Content>
          {children ? (
            <BottomSection {...bottomSectionProps}>{children}</BottomSection>
          ) : null}
        </Content>
      </RoundedBorderLayout>
    </ShadowLightenLayout>
  );
};

const Content = styled.View`
  width: 100%;
  padding: ${({theme}) => theme.offsets.padding_horizontal}px;

  align-self: flex-start;
`;

const BottomSection = styled.View`
  width: 100%;
  margin-top: ${({theme}) => theme.offsets.padding_small}px;
`;

RoundedCardDetailsInfoWithShadowAndBorderLayout.defaultProps = defaultProps;
export default React.memo(RoundedCardDetailsInfoWithShadowAndBorderLayout);
