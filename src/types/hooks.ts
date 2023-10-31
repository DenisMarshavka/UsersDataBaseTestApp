import React from 'react';
import {AnyObjectSchema} from 'yup';
import {FormikProps, FormikSharedConfig} from 'formik';
import {TextInputProps} from 'react-native';

import {InputProps} from '../components/common/Input/type';
import {FormFieldRowProps} from '../components/common/FormFieldRow/type';
import {UpdateUserDataValidationScheme} from '../utils/yup';
import {TToggleInputFocusPress} from './common';

type TValidateFormikFieldsFieldCommonProps = {
  error?: string;
  name: string;
  isUppercaseValue?: boolean;
} & TextInputProps;

export type TValidateFormikFieldsField<T extends InputProps> =
  FormFieldRowProps<T> & TValidateFormikFieldsFieldCommonProps;
export type TAnyFormValidationScheme = UpdateUserDataValidationScheme;

export interface IValidateFormikFieldsResponse<
  T extends TAnyFormValidationScheme,
> extends FormikProps<T> {
  FormFields: React.ReactNode;
  disableSubmit: boolean;
  addNewDynamicListInputByListName?: (listName: string) => void;
  addNewDynamicListInputsDataByListName?: (
    listName: string,
    newValuesData: string[],
  ) => void;
}
export interface ValidateFormikFieldsProps<T extends TAnyFormValidationScheme> {
  (
    fields: (
      | TValidateFormikFieldsField<InputProps>
      | TValidateFormikFieldsField<InputProps>[]
    )[],
    isValid: boolean,
    onSubmit: (values: T) => Promise<void> | void,
    validationSchema: AnyObjectSchema,
    otherFormikConfig?: FormikSharedConfig,
  ): IValidateFormikFieldsResponse<T>;
}

export type TInputFocusParams = (
  inputProps: InputProps & {initialFocused?: boolean},
) => {
  handleToggleFocusPress: TToggleInputFocusPress;
  focused: boolean;
  setFocused: (newFocusStatus: boolean) => void;
};
