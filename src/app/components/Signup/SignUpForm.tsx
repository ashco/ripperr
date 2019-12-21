import React, { useState, FormEvent } from 'react';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpForm = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const {
    username,
    email,
    passwordOne,
    passwordTwo,
    error,
  } = state;

  function onSubmit(event: FormEvent) {
  }

  function onChange(event: FormEvent) {
    // setState({ [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
      {/* {error && <p>{error.message}</p>} */}
    </form>
  );
}

export default SignUpForm;