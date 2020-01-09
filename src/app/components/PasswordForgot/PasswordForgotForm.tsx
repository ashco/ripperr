import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';

import { TextField, passwordForgotVal } from '../Forms';
import { FirebaseContext } from '../Firebase';
// import { IError } from '../Signup/SignUpForm';

interface IPasswordForgotForm {
  email: string;
  // error: null | IError;
}

const INITIAL_VALUES: IPasswordForgotForm = {
  email: '',
  // error: null,
};

const PasswordForgotForm: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={passwordForgotVal}
      onSubmit={({ email }, { resetForm }) => {
        firebase
          .doPasswordReset(email)
          .then(() => {
            resetForm();
          })
          .catch((error) => {
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
