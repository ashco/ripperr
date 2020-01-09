import * as yup from 'yup';

export const signInValidation = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const signUpValidation = yup.object({
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  passwordOne: yup.string().required('Password is required'),
  passwordTwo: yup.string().required('Password is required'),
});

export const passwordForgotValidation = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});
