import styled from 'styled-components/native';
import {FontSize, theme} from '../../theme';
import Button from './Button/component';

type AvatarStyleProps = {size: number};

export const RowInfo = styled.View`
  width: 100%;
  justify-content: start;
  align-items: baseline;
  margin-bottom: ${theme.offsets.m}px;
  flex-direction: row;
`;

export const RowInfoText = styled.Text`
  width: auto;
  margin-left: ${theme.offsets.m}px;
  font-size: ${FontSize.medium.fontSize}px;
  line-height: ${FontSize.medium.lineHeight}px;
  color: ${theme.colors.dark};
`;

export const ScreenTitle = styled.Text`
  text-align: center;
  margin-bottom: ${theme.offsets.mm}px;
  font-size: ${FontSize.ultraSuperLarge.fontSize}px;
  line-height: ${FontSize.ultraSuperLarge.lineHeight}px;
  font-weight: bold;
  color: black;
`;

export const Avatar = styled.Image<AvatarStyleProps>`
  width: ${({size}: AvatarStyleProps) => size}px;
  height: ${({size}: AvatarStyleProps) => size}px;

  border-radius: ${({size}: AvatarStyleProps) => size}px;
`;

export const SubmitBtn = styled(Button)`
  margin-top: ${theme.offsets.l}px;
  width: 100%;
`;
