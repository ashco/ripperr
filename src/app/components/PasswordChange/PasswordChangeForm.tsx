import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import { InterfaceError } from '../Signup/SignUpForm';

interface InterfaceState {
  [key: string]: any;
  passwordOne: string;
  passwordTwo: string;
  error: null | InterfaceError;
}

const INITIAL_STATE: InterfaceState = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const PasswordChangeForm = () => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState(INITIAL_STATE);

  const { passwordOne, passwordTwo, error } = state;
  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  function handleChange(event: { target: { name: string; value: any } }): void {
    const { name, value } = event.target;

    const newState = { ...state };
    newState[name] = value;

    setState(newState);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    firebase
      .doPasswordUpdate(passwordOne)
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
        name="passwordOne"
        value={passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={handleChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default PasswordChangeForm;
