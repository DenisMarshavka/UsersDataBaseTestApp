import {
  StyleProp,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {ShadowProps} from 'react-native-shadow-2';
import {TextInputMaskProps} from 'react-native-masked-text';
import {AppColors} from '../../../theme';

export type TInputFiledRowProps = {label?: string; required?: boolean};

export interface InputProps extends TextInputProps, TInputFiledRowProps {
  initialFocused?: boolean;
  withoutBorder?: boolean;
  withoutErrorBorder?: boolean;
  error?: string;
  valueContentWithErrorPercentsWidth?: number;
  marginTop?: number;
  borderColor?: AppColors;
  withShadow?: boolean;
  loading?: boolean;
  withErrorText?: boolean;
  shadowSettings?: {
    shadowViewProps?: ViewProps & {opacity: number};
  } & ShadowProps;

  withTouchRequiredToValidate?: boolean;
  withMask?: boolean;
  isButton?: boolean;
  buttonProps?: TouchableOpacityProps & InputProps;
  buttonTextProps?: TextProps;
  maskProps?: TextInputMaskProps;
  withTopRightBorderRadius?: boolean;
  withBottomRightBorderRadius?: boolean;
  withTopLeftBorderRadius?: boolean;
  withBottomLeftBorderRadius?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textErrorStyle?: StyleProp<TextStyle>;
}

export const defaultProps: InputProps = {
  initialFocused: undefined,
  withoutBorder: false,
  withoutErrorBorder: false,
  label: '',
  error: '',
  valueContentWithErrorPercentsWidth: 80,
  marginTop: 0,
  borderColor: AppColors.DARK,
  withShadow: false,
  loading: false,
  withErrorText: true,
  shadowSettings: {},
  textAlignVertical: 'center',
  required: false,

  withTouchRequiredToValidate: true,
  isButton: false,
  buttonProps: {
    onPress: () => null,
  },
  buttonTextProps: {},
  withMask: false,
  maskProps: {type: 'cel-phone'},
  withTopRightBorderRadius: true,
  withBottomRightBorderRadius: true,
  withTopLeftBorderRadius: true,
  withBottomLeftBorderRadius: true,
  containerStyle: [],
  textErrorStyle: {},
};
