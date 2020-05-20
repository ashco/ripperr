import * as yup from 'yup';

const username = () => yup.string().required('Username is required');
const email = () =>
  yup.string().required('Email is required').email('Email is not valid');
const password = () =>
  yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters');
const passwordConfirm = () =>
  yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match');

export const signupSchema = yup.object().shape({
  username: username(),
  email: email(),
  password: password(),
  passwordConfirm: passwordConfirm(),
});

export const loginSchema = yup.object().shape({
  email: email(),
  password: password(),
});

export const passwordForgotSchema = yup.object().shape({
  email: email(),
});

export const passwordChangeSchema = yup.object({
  password: password(),
  passwordConfirm: passwordConfirm(),
});
