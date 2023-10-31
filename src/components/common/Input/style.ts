import styled, {css} from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';
import {TextInput, TouchableOpacityProps} from 'react-native';

import {InputProps} from './type';
import {FontSize} from '../../../theme';

export const commonInputStyle = css<InputProps>`
  width: ${({error, valueContentWithErrorPercentsWidth}) =>
    `${!error ? 100 : valueContentWithErrorPercentsWidth}%`};
  padding: 0 0 0 5px;

  font-size: ${FontSize.large.fontSize}px;
  line-height: ${FontSize.small.lineHeight}px;
  color: ${props => props.theme.colors.gray};
`;

export const commonWrapperInputStyle = css<InputProps>`
  width: 100%;
  height: 100%;
  min-height: ${({theme}) => theme.offsets.min_input_height}px;
  max-height: ${({theme, multiline}) =>
    !multiline ? `${theme.offsets.min_input_height}px` : 'auto'};
  padding: ${({theme}) =>
    `${theme.offsets.m}px ${theme.offsets.padding_small}px`};
  margin-top: ${({label, theme}) =>
    label ? theme.offsets.margin_small + 'px' : 0};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border: 1px solid
    ${({error, theme, borderColor}) =>
      !error && borderColor
        ? borderColor
        : theme.colors[!error ? 'gray' : 'danger']};
  border-radius: ${({theme, withoutBorder}) =>
    !withoutBorder ? `${theme.offsets.radius_small}px` : 0};
  background-color: ${props => props.theme.colors.white};

  border-top-right-radius: ${({
    theme,
    withTopRightBorderRadius,
    withoutBorder,
  }) =>
    withTopRightBorderRadius && !withoutBorder
      ? `${theme.offsets.radius_small}px`
      : 0};
  border-bottom-right-radius: ${({
    theme,
    withBottomRightBorderRadius,
    withoutBorder,
  }) =>
    withBottomRightBorderRadius && !withoutBorder
      ? `${theme.offsets.radius_small}px`
      : 0};

  border-top-left-radius: ${({theme, withTopLeftBorderRadius, withoutBorder}) =>
    withTopLeftBorderRadius && !withoutBorder
      ? `${theme.offsets.radius_small}px`
      : 0};
  border-bottom-left-radius: ${({
    theme,
    withBottomLeftBorderRadius,
    withoutBorder,
  }) =>
    withBottomLeftBorderRadius && !withoutBorder
      ? `${theme.offsets.radius_small}px`
      : 0};
`;

export const Container = styled.View<InputProps>`
  margin-top: ${({marginTop}) => (marginTop ? marginTop + 'px' : 0)};
`;

export const Element = styled.View<InputProps>`
  ${commonWrapperInputStyle};
  opacity: ${({editable}) => (editable ? 1 : 0.7)};
`;
export const ButtonElement = styled.TouchableOpacity<
  TouchableOpacityProps & InputProps
>`
  ${commonWrapperInputStyle};
  justify-content: center;
  padding: ${({theme}) =>
    `${theme.offsets.mm}px ${theme.offsets.padding_small}px`};
  opacity: ${({editable}) => (editable ? 1 : 0.7)};
`;

export const ElementInnerRightInfo = styled.View`
  right: ${({theme}) => theme.offsets.small}px;
  justify-content: center;
  align-items: center;
  padding: ${({theme}) => theme.offsets.m}px;
  padding-top: 0;
  padding-bottom: 0;
  background-color: ${({theme}) => theme.colors.white};
`;

export const ContentInput = styled(TextInput)`
  ${commonInputStyle};
`;
export const ContentInputButtonText = styled.Text<InputProps>`
  ${commonInputStyle};
`;
export const ContentInputMask = styled(TextInputMask)`
  ${commonInputStyle};
`;
