import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import FirebaseContext from 'context/FirebaseContext';

import Form from 'components/Form';
import Button from 'components/Button';
import Input from 'components/Input';

import { AuthError } from 'types/types';

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
      defaultValues,
    },
  );

  function onSubmit({ email }: PasswordForgotForm) {
    firebase
      .doPasswordReset(email)
      .then(() => {
        reset();
      })
      .catch((authError) => {
        setAuthError(authError);
        console.error(authError);
      });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="email"
        type="email"
        label="Email:"
        register={register({ required: 'Email is required!' })}
        error={errors.email}
      />
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
