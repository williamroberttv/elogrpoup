import yup from 'yup';
import { Errors } from './types';

export function getValidationErrors(err: yup.ValidationError): Errors {
  const validationErrors: Errors = {};
  err.inner.forEach((error) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });
  return validationErrors;
}
