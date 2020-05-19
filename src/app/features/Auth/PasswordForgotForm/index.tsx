﻿import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import FirebaseContext from 'context/FirebaseContext';

import Form from 'components/Form';
import Button from 'components/Button';
import Input from 'components/Input';

import { AuthError } from 'types/types';
import { passwordForgotSchema } from 'utils/validation-schema';

interface PasswordForgotForm {
  email: string;
}

const defaultValues: PasswordForgotForm = {
  email: '',
};

const PasswordForgotForm: React.FC = () => {
  const firebase = React.useContext(FirebaseContext);

  const [authError, setAuthError] = React.useState<AuthError | false>(false);

  const { register, handleSubmit, reset, errors } = useForm<PasswordForgotForm>(
    {
      mode: 'onBlur',
      defaultValues,
      validationSchema: passwordForgotSchema,
    },
  );

  function onSubmit({ email }: PasswordForgotForm) {
    firebase
      .doPasswordReset(email)
      .then(() => {
        reset();
      })
      .catch((err) => {
        setAuthError(err);
        console.error(err);
      });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="input-container">
        <Input
          name="email"
          type="email"
          label="Email:"
          register={register({ required: 'Email is required!' })}
          error={errors.email}
        />
      </div>
      <Button type="submit">Submit</Button>
      {authError && <p>{authError.message}</p>}
    </Form>
  );
};

export const PasswordForgotLink: React.FC = () => (
  <Link href="/forgot">
    <a>Forgot your password?</a>
  </Link>
);

export default PasswordForgotForm;
