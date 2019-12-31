import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { FirebaseContext } from '../Firebase';
import { InterfaceError } from '../Signup/SignUpForm';

interface InterfaceState {
  [key: string]: any;
  email: string;
  error: null | InterfaceError;
}

const INITIAL_STATE: InterfaceState = {
  email: '',
  error: null,
};

const PasswordForgotForm = () => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState(INITIAL_STATE);

  const { email, error } = state;
  const isInvalid = email === '';

  function handleChange(e: { target: { name: string; value: any } }): void {
    const { name, value } = e.target;

    const newState = { ...state };
    newState[name] = value;

    setState(newState);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    firebase
      .doPasswordReset(email)
      .then(() => {
        setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        setState({ ...state, error });
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export const PasswordForgotLink = () => (
  <p>
    <Link href="/forgot">
      <a>Forgot Password?</a>
    </Link>
  </p>
);

export default PasswordForgotForm;
