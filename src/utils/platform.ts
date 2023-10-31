import * as yup from 'yup';
import {Platform} from 'react-native';

export const isIos = Platform.OS === 'ios';
export const isAndroid = !isIos;
export const isAndroid10 =
  isAndroid && (Platform?.constants as yup.AnyObject)?.Release === '10';
