import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';

import Button from '@/components/Button';
import InputField from '@/domain/MovementForm/InputField';
import { passwordForgotVal } from '@/domain/MovementForm/validationSchema';
import { FirebaseContext } from '@/context';
import { IAuthError } from '@/types/types';

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
