import * as yup from 'yup';

// export const signInVal = yup.object({
//   email: yup
//     .string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: yup.string().required('Password is required'),
// });
export const signupSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

// export const signUpVal = yup.object({
//   // TODO - Make sure username isn't too long
//   username: yup.string().required('Username is required'),
//   email: yup
//     .string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   // TODO - validate that passwords match
//   password: yup.string().required('Password is required'),
//   passwordConfirm: yup.string().required('Password is required'),
// });

// export const passwordForgotVal = yup.object({
//   email: yup
//     .string()
//     .email('Invalid email address')
//     .required('Email is required'),
// });

// export const passwordChangeVal = yup.object({
//   // TODO - validate that passwords match
//   password: yup.string().required('Password is required'),
//   passwordConfirm: yup.string().required('Password is required'),
// });

// // export const exerciseFormVal = yup.object({
// //   name: yup.string().required('Exercise name is required.'),
// // });

// // export const workoutFormVal = yup.object({
// //   name: yup.string().required('Workout name is required.'),
// //   mode: yup.string().required('Workout mode is required.'),
// // });
