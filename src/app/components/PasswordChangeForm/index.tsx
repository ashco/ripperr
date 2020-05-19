import React from 'react';
import { useForm } from 'react-hook-form';

import FirebaseContext from 'context/FirebaseContext';

import Form from 'components/Form';
import FormError from 'components/FormError';
import Input from 'components/Input';
import Button from 'components/Button';

import { AuthError } from 'types/types';

interface PasswordChangeForm {
  password: string;
  passwordConfirm: string;
}

const defaultValues: PasswordChangeForm = {
  password: '',
  passwordConfirm: '',
};

const PasswordChangeForm: React.FC = () => {
  const firebase = React.useContext(FirebaseContext);

  const [authError, setAuthError] = React.useState<AuthError | false>(false);

  const { register, handleSubmit, reset, errors } = useForm<PasswordChangeForm>(
    {
      defaultValues,
    },
  );

  function onSubmit({ password }: PasswordChangeForm) {
    firebase
      .doPasswordUpdate(password)
      .then(() => {
        reset();
      })
      .catch((err) => {
        setAuthError(err);
        console.error(err);
      });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="password"
        type="password"
        label="Password:"
        register={register({ required: 'Password is required!' })}
        error={errors.password}
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Confirm Password:"
        register={register({ required: 'Password is required!' })}
        error={errors.passwordConfirm}
      />
      <Button type="submit">Submit</Button>
      {authError && <FormError>{authError.message}</FormError>}
    </Form>
  );
};

export default PasswordChangeForm;
