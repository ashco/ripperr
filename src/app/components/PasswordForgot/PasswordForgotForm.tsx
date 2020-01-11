import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';

import { InputField, passwordForgotVal } from '../Forms';
import { FirebaseContext } from '../Firebase';
import { AuthErrorSchema } from '../../common/types';

interface IPasswordForgotForm {
  email: string;
}

const INITIAL_VALUES: IPasswordForgotForm = {
  email: '',
};

const PasswordForgotForm: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  const [error, setError] = useState<AuthErrorSchema>(false);

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
            setError(error);
            console.error(error);
          });
      }}
    >
      <Form>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="janedoe@gmail.com"
        />
        <button type="submit">Reset My Password</button>
        {error && <p>{error.message}</p>}
      </Form>
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
