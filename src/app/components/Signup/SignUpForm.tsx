import React, { useState } from 'react';

interface iState {
  [key: string]: any
  username: string
  email: string
  passwordOne: string
  passwordTwo: string
  error: null | object
}

const INITIAL_STATE: iState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpForm = () => {
  const [state, setState] = useState(INITIAL_STATE);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  }

  function handleChange(event: { target: { name: string; value: any } }) {
    const { name, value } = event.target;

    let newState = { ...state };
    newState[name] = value;

    setState(newState);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={state.username}
        onChange={handleChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={state.email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={state.passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={state.passwordTwo}
        onChange={handleChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
      {/* {error && <p>{error.message}</p>} */}
    </form>
  );
}

export default SignUpForm;