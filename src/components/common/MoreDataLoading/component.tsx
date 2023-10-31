import React from 'react';
import {ActivityIndicator} from 'react-native';
import {MoreDataLoadingProps, defaultProps} from './type';
import {Container} from './style';

const MoreDataLoading: React.FC<MoreDataLoadingProps> = ({
  mT,
  active,
  color,
  size,
}): JSX.Element | null =>
  !active ? null : (
    <Container mT={mT || 0}>
      <ActivityIndicator color={color} size={size} />
    </Container>
  );

MoreDataLoading.defaultProps = defaultProps;
export default React.memo(MoreDataLoading);
