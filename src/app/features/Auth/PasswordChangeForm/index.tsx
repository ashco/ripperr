import React from 'react';
import { useForm } from 'react-hook-form';

import FirebaseContext from 'context/FirebaseContext';

import AuthForm from 'components/AuthForm';
import FormError from 'components/FormError';
import Input from 'components/Input';
import Button from 'components/Button';

import { passwordChangeSchema } from 'utils/validation-schema';

import { AuthError } from 'types';

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
      mode: 'onBlur',
      defaultValues,
      validationSchema: passwordChangeSchema,
    },
  );

  function onSubmit({ password }: PasswordChangeForm): void {
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
    <AuthForm onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="input-container">
        <Input
          name="password"
          type="password"
          label="Password:"
          register={register()}
          error={errors.password}
        />
        <Input
          name="passwordConfirm"
          type="password"
          label="Confirm Password:"
          register={register()}
          error={errors.passwordConfirm}
        />
      </div>
      <Button type="submit" primary={true}>
        Submit
      </Button>
      {authError && <FormError>{authError.message}</FormError>}
    </AuthForm>
  );
};

export default PasswordChangeForm;
