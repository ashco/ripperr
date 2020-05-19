import * as yup from 'yup';

// error messages
const usernameReq = 'Username is required';
const emailReq = 'Email is required';
const emailValid = 'Email must be a valid email';
const passwordReq = 'Password is required';
const passwordMin = 'Password must be at least 6 characters';
const passwordConfirmReq = 'Confirm password is required';
const passwordConfirmMatch = 'Passwords must match';

export const signupSchema = yup.object().shape({
  username: yup.string().required(usernameReq),
  email: yup.string().required(emailReq).email(emailValid),
  password: yup.string().required(passwordReq).min(6, passwordMin),
  passwordConfirm: yup
    .string()
    .required(passwordConfirmReq)
    .oneOf([yup.ref('password'), null], passwordConfirmMatch),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required(emailReq).email(emailValid),
  password: yup.string().required(passwordReq).min(6, passwordMin),
});

export const passwordForgotSchema = yup.object().shape({
  email: yup.string().required(emailReq).email(emailValid),
});

export const passwordChangeSchema = yup.object({
  password: yup.string().required(passwordReq).min(6, passwordMin),
  passwordConfirm: yup
    .string()
    .required(passwordConfirmReq)
    .oneOf([yup.ref('password'), null], passwordConfirmMatch),
});
