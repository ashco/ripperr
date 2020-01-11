import * as yup from 'yup';

export const signInVal = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const signUpVal = yup.object({
  // TODO - Make sure username isn't too long
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  // TODO - validate that passwords match
  passwordOne: yup.string().required('Password is required'),
  passwordTwo: yup.string().required('Password is required'),
});

export const passwordForgotVal = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

export const passwordChangeVal = yup.object({
  // TODO - validate that passwords match
  passwordOne: yup.string().required('Password is required'),
  passwordTwo: yup.string().required('Password is required'),
});

export const exerciseFormVal = yup.object({
  name: yup.string().required('Exercise name is required.'),
});

export const workoutFormVal = yup.object({
  name: yup.string().required('Workout name is required.'),
  type: yup.string().required('Workout type is required.'),
});
