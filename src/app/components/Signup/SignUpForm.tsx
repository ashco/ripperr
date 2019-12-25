import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import Firebase, { FirebaseContext } from '../Firebase/index';

interface iState {
  [key: string]: any
  username: string
  email: string
  passwordOne: string
  passwordTwo: string
  error: null | iError
}

interface iError {
  code: string
  message: string
}

const INITIAL_STATE: iState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};



const SignUpForm = () => {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();
  const [state, setState] = useState(INITIAL_STATE);

  const {
    username,
    email,
    passwordOne,
    passwordTwo,
    error } = state;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  function handleChange(event: { target: { name: string; value: any } }) {
    const { name, value } = event.target;

    let newState = { ...state };
    newState[name] = value

    setState(newState);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        setState({ ...INITIAL_STATE });
        router.push('/');
      })
      .catch((error: any) => {
        console.log(error);
        setState({ ...state, error });
      });

  }

  // TODO Enable ESLint

  return (
    <form onSubmit={onSubmit}>
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
      <button type="submit" disabled={isInvalid}>Sign Up</button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default SignUpForm;