import React from 'react';
import {ThemeConsumer} from 'styled-components/native';

import {AppColors} from '../../../theme';
import {defaultErrorMessage} from '../../../utils/constants';
import {ErrorWithRefreshProps, defaultProps} from './type';
import {Container, Message, RefreshBtn} from './style';

const refreshBtnText = 'Try now';

const ErrorWithRefresh: React.FC<ErrorWithRefreshProps> = ({
  message,
  ErrorElement,
  withRefreshBtn,
  refreshRequest,
  withMaxHeight,
  style,
  textStyle,
}): JSX.Element => (
  <ThemeConsumer>
    {theme => (
      <Container withMaxHeight={!!withMaxHeight} style={style}>
        {ErrorElement || (
          <Message
            color={
              theme ? (theme.colors.danger as AppColors) : AppColors.DANGER
            }
            style={textStyle}>
            {message || defaultErrorMessage}
          </Message>
        )}

        {withRefreshBtn && refreshRequest ? (
          <RefreshBtn
            onPress={refreshRequest}
            title={refreshBtnText}
            size={'xs'}
          />
        ) : null}
      </Container>
    )}
  </ThemeConsumer>
);

ErrorWithRefresh.defaultProps = defaultProps;
export default React.memo(ErrorWithRefresh);
