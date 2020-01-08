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

import { signInValidation } from '../Forms/validationSchema';
// import TextInput from '../Forms/TextInput';

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
      validationSchema={signInValidation}
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
