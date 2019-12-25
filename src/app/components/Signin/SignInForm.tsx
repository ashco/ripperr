import React, { useState, useContext } from 'react';
import Firebase, { FirebaseContext } from '../Firebase/index';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInFormBase = () => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState({ ...INITIAL_STATE });

  const { email, password, error } = state;
  const isInvalid = password === '' || email === '';

  const onSubmit = event => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  const onChange = event => {
    setState({ [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {/* {error && <p>{error.message}</p>} */}
    </form>
  );
};
