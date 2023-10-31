import * as yup from 'yup';
import {object, Schema} from 'yup';
import {fieldNotValidMessage, fieldRequireMessage} from './constants';

export type UpdateUserDataValidationScheme = {
  firstName?: string;
  lastName?: string;
  age?: string;
  phone?: string;
  email?: string;
};

const YupFirstNameValidateRule = yup
  .string()
  .min(2, ({min}) => `Minimum ${min} characters`)
  .max(15, ({max}) => `Maximum ${max} characters`);

const YupLastNameValidateRule = yup
  .string()
  .min(3, ({min}) => `Minimum ${min} characters`)
  .max(25, ({max}) => `Maximum ${max} characters`);

export const updateUserValidationScheme: Schema<UpdateUserDataValidationScheme> =
  object().shape({
    firstName: YupFirstNameValidateRule,
    lastName: YupLastNameValidateRule,
    age: yup
      .string()
      .min(1, ({min}) => `Minimum ${min} characters`)
      .max(2, ({max}) => `Maximum ${max} characters`),
    phone: yup
      .string()
      .min(6, ({min}) => `Minimum ${min} characters`)
      .max(15, ({max}) => `Maximum ${max} characters`)
      .required(fieldRequireMessage),
    email: yup.string().email(fieldNotValidMessage),
  });
