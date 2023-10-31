import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

export type LayoutPropsType = {
  nativeEvent: {
    layout: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
};

export type TToggleInputFocusPress = (
  props: NativeSyntheticEvent<TextInputFocusEventData> | undefined,
  isFocus: boolean,
) => void;

export type TId = number | string;

export interface IStatus {
  id: number;
  name: string;
}

export interface IMetaData {
  pageIndex: number;
  totalPages: number;
  itemsCount: number;
}

export interface IResponseListData<T> {
  meta?: IMetaData;
  data: T[];
}
