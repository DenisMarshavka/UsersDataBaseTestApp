import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {theme} from '../../../../theme';
import BackIcon from '../../../../assets/icons/Back';
import {RoundedBorderLayout} from '../../../../layouts';
import {UpdatedLiveTimer} from '../../../../components/common';

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderRightDumbView = styled.View`
  width: ${theme.offsets.xxl}px;
  height: ${theme.offsets.xxl}px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 0 ${theme.offsets.padding_horizontal}px;
`;

export const BackButtonIcon = styled(BackIcon)`
  padding: 0 ${theme.offsets.padding_horizontal}px
    ${theme.offsets.padding_horizontal}px 0;
`;

export const ContentContainer = styled(KeyboardAwareScrollView)`
  margin: 0 ${theme.offsets.padding_horizontal}px;
`;

export const ContentUpdatedRowInfo = styled(UpdatedLiveTimer)`
  margin-top: ${theme.offsets.mm}px;
`;

export const ContentCardContainer = styled(RoundedBorderLayout)`
  padding: ${theme.offsets.mm}px;
  align-items: center;
`;

export const ContentForm = styled.View`
  width: 100%;
  margin-top: ${theme.offsets.mm}px;
  padding: ${theme.offsets.mm}px;
`;
