import * as yup from 'yup';

export const signInValidation = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Required'),
  password: yup.string().required('Password is required'),
});
