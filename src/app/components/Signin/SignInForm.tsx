import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import { TextField, signInValidation } from '../Forms';

import { FirebaseContext } from '../Firebase';
import { IError } from '../Signup/SignUpForm';

export interface ISignInForm {
  email: string;
  password: string;
  // error: null | IError;
}

const initialValues: ISignInForm = {
  email: '',
  password: '',
  // error: null,
};

const SignInForm = () => {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
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
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="janedoe@gmail.com"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          placeholder="password123"
        />
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
