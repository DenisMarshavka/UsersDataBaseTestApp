import styled from 'styled-components/native';
import {AppColors} from '../../../theme';
import {Button} from '../Button';

export const Container = styled.View<{withMaxHeight: boolean}>`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: ${({withMaxHeight}) => (withMaxHeight ? '100%' : 'auto')};
`;

export const RefreshBtn = styled(Button)`
  margin-top: ${({theme}) => theme.offsets.small}px;
  max-width: 35%;
`;

export const Message = styled.Text<{color: AppColors}>`
  width: 100%;
  text-align: center;
  color: ${({color}) => color};
`;
