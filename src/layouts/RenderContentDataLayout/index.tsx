import React from 'react';
import styled, {ThemeConsumer, css} from 'styled-components/native';
import {ActivityIndicator, ViewProps} from 'react-native';

import {AppColors, screenHeight} from '../../theme';
import {
  defaultEmptyListMessage,
  defaultErrorMessage,
} from '../../utils/constants';
import {ErrorWithRefresh, MoreDataLoading} from '../../components/common';

const defaultContentHeight = screenHeight / 1.4;

export interface RenderContentDataLayoutProps extends ViewProps {
  error: boolean;
  isLoading: boolean;

  isEmpty?: boolean;
  isMoreLoading?: boolean;
  ErrorElement?: JSX.Element;
  errorText?: string;
  EmptyDataElement?: JSX.Element;
  emptyText?: string;
  height?: number;
  refreshData?: (data?: any) => void;
}

export const defaultProps: RenderContentDataLayoutProps = {
  error: false,
  isLoading: true,
  isEmpty: true,

  isMoreLoading: false,
  ErrorElement: undefined,
  errorText: defaultErrorMessage,
  EmptyDataElement: undefined,
  emptyText: defaultEmptyListMessage,
  height: defaultContentHeight,
  refreshData: undefined,
};

const RenderContentDataLayout: React.FC<RenderContentDataLayoutProps> = ({
  error,
  isLoading,
  isMoreLoading,
  ErrorElement,
  children,
  EmptyDataElement,
  emptyText,
  isEmpty,
  errorText,
  height,
  refreshData,
}): JSX.Element => (
  <ThemeConsumer>
    {theme => (
      <Container
        height={height}
        error={error}
        isLoading={isLoading}
        isEmpty={!!isEmpty}>
        {error && !isLoading && !isMoreLoading ? (
          <ErrorWithRefresh
            refreshRequest={refreshData}
            ErrorElement={ErrorElement}
            message={errorText}
          />
        ) : isLoading && !isMoreLoading ? (
          <ContentContainer>
            <ActivityIndicator
              color={theme ? theme.colors.primary : AppColors.PRIMARY}
              size={'large'}
            />
          </ContentContainer>
        ) : isEmpty ? (
          <>
            {EmptyDataElement || (
              <ContentContainer>
                <MessageText
                  color={
                    theme
                      ? (theme.colors.gray_lighten as AppColors)
                      : AppColors.GRAY_LIGHTEN
                  }>
                  {emptyText || defaultEmptyListMessage}
                </MessageText>
              </ContentContainer>
            )}
          </>
        ) : (
          <>
            {children}

            <MoreDataLoading active={!!isMoreLoading} />
          </>
        )}
      </Container>
    )}
  </ThemeConsumer>
);

const commonStyle = css`
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

const Container = styled.View<{
  height?: number;
  isLoading: boolean;
  error: boolean;
  isEmpty: boolean;
}>`
  ${commonStyle};
  ${({height, isLoading, isEmpty, error}) =>
    height && (isLoading || error || isEmpty)
      ? `height: ${height || defaultContentHeight}px`
      : ''};
`;

const ContentContainer = styled.View`
  ${commonStyle};
  height: 100%;
`;
const MessageText = styled.Text<{color: AppColors}>`
  width: 100%;
  text-align: center;
  color: ${({color}) => color};
`;

RenderContentDataLayout.defaultProps = defaultProps;
export default React.memo(RenderContentDataLayout);
