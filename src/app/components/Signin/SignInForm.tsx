import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import { InputField, signInVal } from '../Forms';

import { FirebaseContext } from '../Firebase';
import { IAuthError } from '../../common/types';

export interface ISignInFormValues {
  email: string;
  password: string;
}

const INITIAL_VALUES: ISignInFormValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();

  const [error, setError] = useState<IAuthError | false>(false);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={signInVal}
      onSubmit={({ email, password }, { resetForm }) => {
        firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(() => {
            resetForm();
            router.push('/');
          })
          .catch((error) => {
            setError(error);
            console.log(error);
          });
      }}
    >
      <Form>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="janedoe@gmail.com"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="password123"
        />
        <button type="submit">Sign In</button>
        {error && <p>{error.message}</p>}
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
