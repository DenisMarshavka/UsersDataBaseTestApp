import React from 'react';
import {Label, RowInfo, RowInfoText} from '..';
import {RowDetailsInfoProps, defaultProps} from './type';

export const RowDetailsInfo: React.FC<RowDetailsInfoProps> = ({
  label,
  text,
  numberOfLines,
  style,
}): React.ReactElement => (
  <RowInfo style={style}>
    <Label isBold>{label}:</Label>

    <RowInfoText numberOfLines={numberOfLines}>{text}</RowInfoText>
  </RowInfo>
);

RowDetailsInfo.defaultProps = defaultProps;
export default React.memo(RowDetailsInfo);
