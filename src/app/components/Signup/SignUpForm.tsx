import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../Firebase/index';

interface IState {
  [key: string]: any;
  username: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: null | IError;
}

export interface IError {
  code: string;
  message: string;
}

const INITIAL_STATE: IState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpForm: React.FunctionComponent = () => {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();
  const [state, setState] = useState(INITIAL_STATE);

  const { username, email, passwordOne, passwordTwo, error } = state;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  function handleChange(e: { target: { name: string; value: any } }): void {
    const { name, value } = e.target;

    const newState = { ...state };
    newState[name] = value;

    setState(newState);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        if (authUser.user) {
          return firebase.user(authUser.user.uid).set({
            username,
            email,
          });
        }
      })
      .then(() => {
        setState({ ...INITIAL_STATE });
        router.push('/');
      })
      .catch(error => {
        console.log(error);
        setState({ ...state, error });
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={username}
        onChange={handleChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={handleChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit" disabled={isInvalid}>
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignUpForm;
