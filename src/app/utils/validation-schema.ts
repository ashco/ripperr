import * as yup from 'yup';

const username = (): yup.StringSchema<string> =>
  yup.string().required('Username is required');

const email = (): yup.StringSchema<string> =>
  yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email');

const password = (): yup.StringSchema<string> =>
  yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters');

const passwordConfirm = (): yup.StringSchema<string> =>
  yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match');

const id = (): yup.StringSchema<string> => yup.string().required().length(20);

const moveName = (): yup.StringSchema<string> =>
  yup.string().required('Name is required');

const description = (): yup.StringSchema<string> => yup.string();

const tags = (): yup.ArraySchema<string> => yup.array().of(id());

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

export const tagSchema = yup.object({
  name: moveName(),
  description: description(),
});

export const exerciseSchema = yup.object({
  name: moveName(),
  description: description(),
  tags: tags(),
});

export const workoutSchema = yup.object({
  name: moveName(),
  description: description(),
  tags: tags(),
});
