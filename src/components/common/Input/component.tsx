import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Keyboard,
  TextInputProps,
} from 'react-native';

import ErrorIcon from '../../../assets/icons/Error';
import {AppColors, AppSizes} from '../../../theme';
import {defaultProps, InputProps} from './type';
import Label from '../Label/component';
import {ShadowLightenLayout} from '../../../layouts';
import useInputFocus from '../../../hooks/useInputFocus';
import ErrorText from '../ErrorText/component';
import {DEFAULT_ACTIVE_OPACITY_BTN} from '../../../utils';
import {
  ButtonElement,
  Container,
  ContentInput,
  ContentInputButtonText,
  ContentInputMask,
  Element,
  ElementInnerRightInfo,
} from './style';

const Input: React.FC<InputProps> = ({
  marginTop,
  withoutBorder,
  withoutErrorBorder,
  error,
  label,
  borderColor,
  editable,
  onBlur,
  style,
  containerStyle,
  initialFocused,

  withShadow,
  shadowSettings,
  loading,
  withErrorText,

  onLayout,
  required,
  focusable,

  isButton,
  buttonProps,
  buttonTextProps,

  withMask,
  maskProps,
  withBottomRightBorderRadius,
  withTopRightBorderRadius,
  withTopLeftBorderRadius,
  withBottomLeftBorderRadius,
  valueContentWithErrorPercentsWidth,
  textErrorStyle,
  ...restProps
}): JSX.Element => {
  const inputProps = React.useMemo(
    (): TextInputProps => ({
      style,
      onLayout,
      autoCorrect: false,
      onBlur: e => {
        Keyboard.dismiss();
        onBlur && onBlur(e);
      },
      ...restProps,
    }),
    [onBlur, style, onLayout, restProps],
  );

  const {focused, handleToggleFocusPress} = useInputFocus({
    ...inputProps,
    initialFocused,
  });

  const commonInputProps = React.useMemo(
    (): TextInputProps => ({
      editable,
      ...inputProps,
      onFocus: e => {
        handleToggleFocusPress(e, true);
        inputProps?.onFocus?.(e);
      },
      onBlur: e => {
        handleToggleFocusPress(e, false);
        inputProps?.onBlur?.(e);
      },
    }),
    [handleToggleFocusPress, inputProps, editable],
  );

  const wrapperInputCommonProps = React.useMemo(
    () => ({
      label,
      borderColor:
        !withoutBorder && focused && !error
          ? AppColors.PRIMARY
          : error && !withoutBorder && !withoutErrorBorder
          ? AppColors.DANGER
          : withoutBorder
          ? AppColors.TRANSPARENT
          : borderColor,
      withBottomRightBorderRadius,
      withTopRightBorderRadius,
      withTopLeftBorderRadius,
      withBottomLeftBorderRadius,
      withoutBorder,
      withoutErrorBorder,
    }),
    [
      borderColor,
      withoutBorder,
      error,
      focused,
      label,
      withBottomRightBorderRadius,
      withTopRightBorderRadius,
      withoutErrorBorder,
      withTopLeftBorderRadius,
      withBottomLeftBorderRadius,
    ],
  );

  const renderErrorOrLoadingElements =
    React.useCallback((): React.ReactElement | null => {
      return error || loading ? (
        <ElementInnerRightInfo>
          {error ? (
            <ErrorIcon />
          ) : (
            <ActivityIndicator
              color={AppColors.PRIMARY}
              size={AppSizes.PADDING_SMALL}
            />
          )}
        </ElementInnerRightInfo>
      ) : null;
    }, [error, loading]);

  React.useEffect(() => {
    if (initialFocused !== undefined) {
      handleToggleFocusPress(undefined, initialFocused);
    }
  }, [initialFocused, handleToggleFocusPress]);

  const renderButtonContent = React.useCallback(
    (): JSX.Element => (
      <ButtonElement
        {...wrapperInputCommonProps}
        activeOpacity={DEFAULT_ACTIVE_OPACITY_BTN}
        {...buttonProps}
        onPress={(e: GestureResponderEvent) => {
          handleToggleFocusPress(undefined, true);
          buttonProps?.onPress?.(e);
        }}
        editable={editable}>
        {restProps.children}

        <ContentInputButtonText
          {...buttonTextProps}
          valueContentWithErrorPercentsWidth={100}
          error={error}
          style={[
            buttonTextProps?.style,
            !restProps.value && {
              color: restProps.placeholderTextColor,
            },
          ]}>
          {restProps.value || restProps.placeholder}
        </ContentInputButtonText>

        {renderErrorOrLoadingElements()}
      </ButtonElement>
    ),
    [
      editable,
      wrapperInputCommonProps,
      buttonProps,
      error,
      restProps,
      buttonTextProps,
      renderErrorOrLoadingElements,
      handleToggleFocusPress,
    ],
  );

  const renderContent = React.useCallback((): JSX.Element => {
    const props = {
      valueContentWithErrorPercentsWidth,
      ...commonInputProps,
    };

    if (isButton) {
      return renderButtonContent();
    }
    return (
      <Element
        {...wrapperInputCommonProps}
        editable={editable}
        withoutBorder={withoutBorder}>
        {withMask && maskProps ? (
          <ContentInputMask
            {...props}
            {...maskProps}
            focusable={focused || focusable}
          />
        ) : (
          <ContentInput {...props} focusable={focused || focusable} />
        )}

        {renderErrorOrLoadingElements()}
      </Element>
    );
  }, [
    editable,
    valueContentWithErrorPercentsWidth,
    isButton,
    withoutBorder,
    wrapperInputCommonProps,
    withMask,
    maskProps,
    commonInputProps,
    focused,
    focusable,
    renderButtonContent,
    renderErrorOrLoadingElements,
  ]);

  return (
    <Container marginTop={marginTop} onLayout={onLayout} style={containerStyle}>
      {label ? <Label isRequired={required}>{label}</Label> : null}

      {withShadow ? (
        <ShadowLightenLayout
          offset={[0, '10%']}
          shadowViewProps={{opacity: 0.013}}
          {...shadowSettings}>
          {renderContent()}
        </ShadowLightenLayout>
      ) : (
        renderContent()
      )}

      {error && withErrorText ? (
        <ErrorText mT={AppSizes.MARGIN_SMALL} style={textErrorStyle}>
          {error}
        </ErrorText>
      ) : null}
    </Container>
  );
};

Input.defaultProps = defaultProps;
export default React.memo(Input);
