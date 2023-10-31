import styled from 'styled-components/native';
import {ErrorTextProps} from './type';
import {theme} from '../../../theme';

export const Content = styled.Text<ErrorTextProps>`
  color: ${theme.colors.danger};
  font-size: ${({fontSize}: {fontSize?: number}) => fontSize ?? 16}px;
  margin-top: ${({mT}: {mT?: number}) => (mT ? `${mT}px` : 0)};
  font-weight: 400;
`;
