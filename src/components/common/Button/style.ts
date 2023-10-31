import styled from 'styled-components/native';
import {ButtonProps} from './type';
import {FontSize} from '../../../theme';

export const Container = styled.Pressable<ButtonProps>`
  margin-top: ${({marginTop}) => (marginTop ? marginTop + 'px' : 0)};
  padding: ${({theme, size}) =>
    size === 'xs' ? theme.offsets.margin_small : theme.offsets.padding_small}px;
  padding-left: ${({theme, size}) =>
    size === 'xs'
      ? theme.offsets.padding_small
      : theme.offsets.padding_small}px;
  padding-right: ${({theme, size}) =>
    size === 'xs'
      ? theme.offsets.padding_small
      : theme.offsets.padding_small}px;
  width: auto;

  justify-content: center;
  align-items: center;
  flex-direction: ${({children}) => (children ? 'row' : 'column')};

  opacity: ${({disable, withOutline}) => (withOutline && disable ? 0.5 : 1)};
  border-radius: ${({theme}) => theme.offsets.radius}px;
  border: 1px solid
    ${({theme, disable, withOutline}) =>
      theme.colors[disable && !withOutline ? 'gray_lighten' : 'primary']};
  background-color: ${({theme, disable, withOutline}) =>
    theme.colors[
      !disable && !withOutline
        ? 'primary'
        : withOutline
        ? 'white'
        : 'gray_lighten'
    ]};
`;

export const Text = styled.Text<{
  lineHeight?: number;
  fontSize?: number;
  withOutline?: boolean;
}>`
  color: ${({theme, withOutline}) =>
    theme.colors[!withOutline ? 'white' : 'primary']};
  font-size: ${({fontSize}) => fontSize || FontSize.small.fontSize}px;
  line-height: ${({lineHeight}) => lineHeight || FontSize.small.lineHeight}px;
`;
