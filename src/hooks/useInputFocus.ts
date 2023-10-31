import React from 'react';
import {TToggleInputFocusPress} from '../types/common';
import {TInputFocusParams} from '../types/hooks';

const useInputFocus: TInputFocusParams = inputProps => {
  const [focused, setFocused] = React.useState(false);

  const handleToggleFocusPress = React.useCallback<TToggleInputFocusPress>(
    (props, isFocus = true) => {
      setFocused(
        inputProps?.initialFocused === undefined
          ? isFocus
          : inputProps.initialFocused,
      );

      if (inputProps?.initialFocused === undefined) {
        props && isFocus && inputProps?.onFocus && inputProps?.onFocus?.(props);
        props && !isFocus && inputProps?.onBlur && inputProps?.onBlur?.(props);
      }
    },
    [setFocused, inputProps],
  );

  return {
    handleToggleFocusPress,
    focused,
    setFocused,
  };
};

export default useInputFocus;
