import styled, {css} from 'styled-components/native';
import {FontSize} from '../../../theme';
import {LabelProps} from './type';

export const commonStyle = css`
  font-size: ${FontSize.medium.fontSize}px;
  line-height: ${FontSize.medium.lineHeight}px;
  color: ${props => props.theme.colors.dark};
`;

export const Element = styled.Text<LabelProps>`
  ${commonStyle};

  font-weight: ${({isBold}) => (isBold ? 'bold' : 'normal')};
`;

export const RequiredSymbol = styled.Text`
  ${commonStyle};

  color: ${props => props.theme.colors.primary};
`;
