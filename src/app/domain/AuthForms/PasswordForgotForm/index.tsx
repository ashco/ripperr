import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';

import Button from './node_modules/components/Button';
import InputField from './node_modules/components/MovementForm/InputField';
import { passwordForgotVal } from './node_modules/components/MovementForm/validationSchema';
import { FirebaseContext } from './node_modules/context';
import { IAuthError } from './node_modules/types/types';

interface IPasswordForgotForm {
  email: string;
}

const INITIAL_VALUES: IPasswordForgotForm = {
  email: '',
};

const PasswordForgotForm: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  const [error, setError] = useState<IAuthError | false>(false);

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
        <InputField name="email" type="email" placeholder="Email" />
        <Button type="submit">Reset Password</Button>
        {error && <p>{error.message}</p>}
      </Form>
    </Formik>
  );
};

export const PasswordForgotLink: React.FC = () => (
  <Link href="/forgot">
    <a>Forgot your password?</a>
  </Link>
);

export default PasswordForgotForm;
