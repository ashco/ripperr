import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { FirebaseContext } from '../Firebase';
import { IError } from '../Signup/SignUpForm';

interface IState {
  [key: string]: any;
  email: string;
  password: string;
  error: null | IError;
}

const INITIAL_STATE: IState = {
  email: '',
  password: '',
  error: null,
};

const SignInForm = () => {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();
  const [state, setState] = useState({ ...INITIAL_STATE });

  const { email, password, error } = state;
  const isInvalid = password === '' || email === '';

  function handleChange(event: { target: { name: string; value: any } }): void {
    const { name, value } = event.target;

    const newState = { ...state };
    newState[name] = value;

    setState(newState);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setState({ ...INITIAL_STATE });
        router.push('/');
      })
      .catch(error => {
        setState({ ...state, error });
      });
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {error && <p>{error.message}</p>}
    </FormWrapper>
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
