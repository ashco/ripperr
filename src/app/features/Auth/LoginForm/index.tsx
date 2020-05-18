import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import InputField from 'features/MovementForm/InputField';
import { signInVal } from 'features/MovementForm/validationSchema';
import FormError from 'components/FormError';
import Button from 'components/Button';

import FirebaseContext from 'context/FirebaseContext';
import { IAuthError } from 'types/types';

export interface ILoginFormValues {
  email: string;
  password: string;
}

const INITIAL_VALUES: ILoginFormValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();

  const [error, setError] = useState<IAuthError | false>(false);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={signInVal}
      onSubmit={({ email, password }, { resetForm }) => {
        firebase
          .doLoginWithEmailAndPassword(email, password)
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
      <StyledForm>
        <InputField name="email" type="email" placeholder="Email" />
        <InputField name="password" type="password" placeholder="Password" />
        <Button type="submit">Sign In</Button>
        {error && <FormError>{error.message}</FormError>}
      </StyledForm>
    </Formik>
  );
};

const StyledForm = styled(Form)`
  /* border: black 4px solid; */
  display: grid;
  grid-template-rows: auto auto auto;
  /* * {
    margin-bottom: 4px;
  } */
  /* input {
    height: 2rem;
  } */
`;

export default LoginForm;
