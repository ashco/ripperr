import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Button from 'components/Button';
import Form from 'components/Form';
import FormError from 'components/FormError';

import FirebaseContext from 'context/FirebaseContext';
import { AuthError } from 'types/types';

import { loginSchema } from 'utils/validation-schema';

interface LoginForm {
  email: string;
  password: string;
}

const defaultValues: LoginForm = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const firebase = React.useContext(FirebaseContext);
  const router = useRouter();

  const [authError, setAuthError] = React.useState<AuthError | false>(false);

  const { register, handleSubmit, reset, errors } = useForm<LoginForm>({
    mode: 'onBlur',
    defaultValues,
    validationSchema: loginSchema,
  });

  function onSubmit({ email, password }: LoginForm) {
    firebase
      .doLoginWithEmailAndPassword(email, password)
      .then(() => {
        reset();
        router.push('/moves');
      })
      .catch((err) => {
        setAuthError(err);
        console.log(err);
      });
  }

  console.log(errors);
  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="input-container">
        <Input
          name="email"
          type="email"
          label="Email:"
          register={register()}
          error={errors.email}
        />
        <Input
          name="password"
          type="password"
          label="Password:"
          register={register()}
          error={errors.password}
        />
      </div>
      <Button type="submit">Submit</Button>
      {authError && <FormError>{authError.message}</FormError>}
    </Form>
  );
};

export default LoginForm;
