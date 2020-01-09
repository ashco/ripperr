import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';

import { TextField, passwordForgotValidation } from '../Forms';
import { FirebaseContext } from '../Firebase';
import { IError } from '../Signup/SignUpForm';

interface IPasswordForgotForm {
  email: string;
  // error: null | IError;
}

const initialValues: IPasswordForgotForm = {
  email: '',
  // error: null,
};

const PasswordForgotForm: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  // const [state, setState] = useState(initialValues);

  // const { email, error } = state;
  // const isInvalid = email === '';

  // function handleChange(e: { target: { name: string; value: any } }): void {
  //   const { name, value } = e.target;

  //   const newState = { ...state };
  //   newState[name] = value;

  //   setState(newState);
  // }

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
  //   e.preventDefault();

  //   firebase
  //     .doPasswordReset(email)
  //     .then(() => {
  //       setState({ ...INITIAL_STATE });
  //     })
  //     .catch(error => {
  //       setState({ ...state, error });
  //       console.error(error);
  //     });
  // }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordForgotValidation}
      onSubmit={({ email }, { resetForm }) => {
        firebase
          .doPasswordReset(email)
          .then(() => {
            resetForm();
          })
          .catch(error => {
            console.error(error);
          });
      }}
    >
      <Form>
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="janedoe@gmail.com"
        />
        <button type="submit">Reset My Password</button>
      </Form>
      {/* {error && <p>{error.message}</p>} */}
    </Formik>
  );
};

export const PasswordForgotLink: React.FC = () => (
  <p>
    <Link href="/forgot">
      <a>Forgot Password?</a>
    </Link>
  </p>
);

export default PasswordForgotForm;
