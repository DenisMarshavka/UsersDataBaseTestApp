import React from 'react';
import {ShadowProps, Shadow} from 'react-native-shadow-2';
import {ViewProps} from 'react-native';
import styled from 'styled-components/native';

import {AppColors} from '../../theme';
import {LayoutPropsType} from '../../types';
import {IElementSize} from '../../types/models/ui/IElemntSize';

export interface ShadowLightenLayoutProps extends ShadowProps {
  shadowViewProps?: ViewProps & {opacity: number};
}
export const defaultProps: ShadowLightenLayoutProps = {
  offset: undefined,
};

const ShadowLightenLayout: React.FC<ShadowLightenLayoutProps> = ({
  children,
  style,
  containerStyle,
  shadowViewProps,
  offset,
  ...restProps
}): JSX.Element => {
  const [elSize, setElSize] = React.useState<IElementSize>({
    height: 0,
    width: 0,
  });

  const handleLayout = React.useCallback((event: LayoutPropsType) => {
    let {height, width} = event.nativeEvent.layout;

    setElSize({height, width});
  }, []);

  const defaultSettings = React.useMemo(
    (): ShadowProps => ({
      startColor: AppColors.DARK_LIGHTEN,
      offset: offset || [0, elSize.height / 1.9],
      style: [
        {
          width: '100%',
        },
        style,
      ],
      shadowViewProps: {
        opacity: 0.01,
        ...shadowViewProps,
      },
      containerStyle: [
        {
          width: '100%',
        },
        containerStyle,
      ],
      ...restProps,
    }),
    [style, containerStyle, restProps, shadowViewProps, elSize, offset],
  );

  return (
    <Shadow {...defaultSettings}>
      <Content onLayout={handleLayout}>{children}</Content>
    </Shadow>
  );
};

const Content = styled.View`
  width: 100%;
`;

ShadowLightenLayout.defaultProps = defaultProps;
export default React.memo(ShadowLightenLayout);
