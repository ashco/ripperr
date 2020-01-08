import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  FormikProps,
} from 'formik';
import * as Yup from 'yup';

import { FirebaseContext } from '../Firebase';
import { IError } from '../Signup/SignUpForm';

interface IFormValues {
  email: string;
  password: string;
  // error: null | IError;
}

const INITIAL_FORM_VALUES: IFormValues = {
  email: '',
  password: '',
  // error: null,
};

const SignInForm = () => {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
      onSubmit={({ email, password }, { resetForm }) => {
        firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(() => {
            resetForm();
            router.push('/');
          })
          .catch(error => {
            console.log(error);
          });
      }}
    >
      <Form>
        {/* <TextInput
          label="Email"
          name="email"
          type="email"
          placeholder="janedoe@gmail.com"
        /> */}
        <label htmlFor="email">Password</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

// // Shape of form values
// interface FormValues {
//   email: string;
//   password: string;
// }

// interface OtherProps {
//   message: string;
// }

// const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
//   const { touched, errors, isSubmitting, message } = props;
//   return (
//     <Form>
//       <h1>{message}</h1>
//       <Field type="email" name="email" />
//       {touched.email && errors.email && <div>{errors.email}</div>}

//       <Field type="password" name="password" />
//       {touched.password && errors.password && <div>{errors.password}</div>}

//       <button type="submit" disabled={isSubmitting}>
//         Submit
//       </button>
//     </Form>
//   );
// };

// interface FormValues = {

// }

// const TextInput = (props: FormikProps<FormValues>) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input> and also replace ErrorMessage entirely.
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

const FormWrapper = styled.form`
  /* border: black 4px solid; */
  display: flex;
  flex-direction: column;
  * {
    margin-bottom: 4px;
  }
  input {
    height: 2rem;
  }
`;

export default SignInForm;
