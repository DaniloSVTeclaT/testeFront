import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    if (error.path){
    validationErrors[error.path] = error.message;}
    else{
      validationErrors[0] = 'Unknown error'
    }
  });

  return validationErrors;
}