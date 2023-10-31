import {StyleSheet, TextStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {css} from 'styled-components/native';
import {screenWidth} from './deviceWindow';

export const normFontSizeValue = (value: number = 1): number => {
  return +RFValue(value, screenWidth);
};

export const FontSize = StyleSheet.create({
  //12
  small: {
    fontSize: normFontSizeValue(7),
    lineHeight: normFontSizeValue(11),
  } as TextStyle,
  //14
  medium: {
    fontSize: normFontSizeValue(8),
    lineHeight: normFontSizeValue(12),
  } as TextStyle,
  //16
  large: {
    fontSize: normFontSizeValue(9),
    lineHeight: normFontSizeValue(10),
  } as TextStyle,
  //22
  ultraSuperLarge: {
    fontSize: normFontSizeValue(11),
    lineHeight: normFontSizeValue(11),
  } as TextStyle,
});

export const mediumText = css`
  font-size: ${FontSize.ultraSuperLarge.fontSize}px;
  line-height: ${FontSize.ultraSuperLarge.lineHeight}px;
`;

export const regularText = css`
  font-size: ${FontSize.large.fontSize}px;
  line-height: ${FontSize.large.lineHeight}px;
`;

export const boldText = css`
  font-size: ${FontSize.medium.fontSize}px;
  line-height: ${FontSize.medium.lineHeight}px;
`;
