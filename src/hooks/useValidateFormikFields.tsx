import React from 'react';
import {FormikErrors, FormikTouched, FormikValues, useFormik} from 'formik';
import * as yup from 'yup';
import styled from 'styled-components/native';

import {InputProps} from '../components/common/Input/type';
import FormFieldRow from '../components/common/FormFieldRow/component';
import {
  TAnyFormValidationScheme,
  TValidateFormikFieldsField,
  ValidateFormikFieldsProps,
} from '../types/hooks';

export const useValidateFormikFields: ValidateFormikFieldsProps<
  TAnyFormValidationScheme
> = (fields, isValid, onSubmit, validationSchema, otherFormikConfig) => {
  const setFormFieldValuesRef = React.useRef<
    (field: string, value: any, shouldValidate?: boolean | undefined) => void
  >(() => undefined);
  const setFormFieldTouchedRef = React.useRef<
    (
      field: string,
      touched?: boolean | undefined,
      shouldValidate?: boolean | undefined,
    ) => void
  >(() => undefined);

  const initialValues = React.useMemo((): FormikValues => {
    const res: FormikValues = {};

    const goSetInitialValues = (
      inputs: (
        | (InputProps & {
            name: string;
          })
        | (InputProps & {
            name: string;
          })[]
      )[],
    ) => {
      inputs.forEach(input => {
        if (Array.isArray(input)) {
          goSetInitialValues(input);
          return;
        }
        if (input?.name) {
          res[input.name] = input.value;
        }
      });
    };

    goSetInitialValues(fields);

    return res;
  }, [fields]);

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    setErrors,
    errors,
    handleBlur,
    touched,
    setFieldTouched,
    ...rest
  } = useFormik({
    validateOnBlur: true,
    initialValues: initialValues as TAnyFormValidationScheme,
    onSubmit,
    validationSchema,
    ...otherFormikConfig,
  });

  React.useEffect(() => {
    setFormFieldValuesRef.current = setFieldValue;
    setFormFieldTouchedRef.current = setFieldTouched;
  }, [values, setFieldValue, setFieldTouched, touched]);

  const handleValueChange = React.useCallback(
    (fieldProps: TValidateFormikFieldsField<InputProps>, newVal: string) => {
      const {isUppercaseValue, name} = fieldProps;

      handleChange(name)((isUppercaseValue && newVal.toUpperCase()) || newVal);
    },
    [handleChange],
  );

  const FormFields = React.useMemo((): React.ReactNode => {
    const renderFields = (
      inputs: (
        | TValidateFormikFieldsField<InputProps>
        | TValidateFormikFieldsField<InputProps>[]
      )[],
    ): React.ReactNode => {
      return inputs.map((fieldProps, index) => {
        if (Array.isArray(fieldProps)) {
          return (
            <MultiRowFields key={`form-row-input-${index}-row`}>
              {renderFields(fieldProps)}
            </MultiRowFields>
          );
        }

        const {isButton, name} = fieldProps;

        const props = {...fieldProps};
        const {withTouchRequiredToValidate, error} = props;

        const formError = (errors as FormikErrors<FormikValues>)?.[
          name
        ] as string;
        const touchedInputError =
          (touched as FormikTouched<FormikValues>)?.[name] && formError;
        props.value = (values as FormikValues)?.[name];
        props.error =
          error ||
          (!withTouchRequiredToValidate && formError) ||
          (withTouchRequiredToValidate && touchedInputError) ||
          '';

        if (isButton) {
          props.buttonProps = {
            ...fieldProps.buttonProps,

            onPress: e => {
              setFieldTouched(name);

              fieldProps?.buttonProps?.onPress?.(e);
            },
          };

          return <FormFieldRow key={`form-select-input-${name}`} {...props} />;
        }

        props.onChangeText = (newVal: string) => {
          handleValueChange(fieldProps, newVal);

          fieldProps?.onChangeText?.(newVal);
        };

        props.onBlur = e => {
          setFieldTouched(name);

          fieldProps?.onBlur?.(e);
        };

        return <FormFieldRow key={`form-input-${name}`} {...props} />;
      });
    };

    return renderFields(fields);
  }, [fields, setFieldTouched, handleValueChange, values, touched, errors]);

  const isTouchedRuleValid = React.useMemo((): boolean => {
    let touchedInputsLength = 0;
    const requiredTouchedInputLength =
      (fields?.length &&
        (fields as yup.AnyObject[]).filter(
          field =>
            (!!field?.withTouchRequiredToValidate || !!field?.required) &&
            !field?.value?.trim?.(),
        ).length) ||
      0;

    if (Object?.keys(touched)?.length) {
      touchedInputsLength = Object.keys(touched)
        .map(tItemKey => ({touched: !!(touched as yup.AnyObject)?.[tItemKey]}))
        .filter(tItem => tItem.touched).length;
    }

    const isExistingAnyError = !!Object.keys(errors)?.filter(
      i =>
        !!(errors as any)?.[i] &&
        (!Array.isArray((errors as any)?.[i]) ||
          !!((errors as any)?.[i] as string[])?.filter?.(ii => !!ii?.trim?.())
            .length),
    ).length;

    return (
      touchedInputsLength === requiredTouchedInputLength || !isExistingAnyError
    );
  }, [touched, fields, errors]);

  const disableSubmit = React.useMemo(
    (): boolean => !isTouchedRuleValid || !isValid /*|| !rest?.isValid*/,
    [isTouchedRuleValid /*, rest*/, isValid],
  );

  return {
    FormFields,
    onSubmit,
    handleSubmit,
    setFieldValue,
    values,
    handleChange,
    errors,
    handleBlur,
    disableSubmit,
    touched,
    setFieldTouched,
    setErrors,
    ...rest,
  };
};

const MultiRowFields = styled.View`
  width: 100%;
  flex-direction: row;
`;
