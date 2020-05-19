import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Button from 'components/Button';
import Form from 'components/Form';
import FormError from 'components/FormError';

import FirebaseContext from 'context/FirebaseContext';
import { AuthError } from 'types/types';

interface LoginForm {
  email: string;
  password: string;
}

const defaultValues: LoginForm = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const firebase = React.useContext(FirebaseContext);
  const router = useRouter();

  const [authError, setAuthError] = React.useState<AuthError | false>(false);

  const { register, handleSubmit, reset, errors } = useForm<LoginForm>({
    defaultValues,
  });

  function onSubmit({ email, password }: LoginForm) {
    firebase
      .doLoginWithEmailAndPassword(email, password)
      .then(() => {
        reset();
        router.push('/moves');
      })
      .catch((authError) => {
        setAuthError(authError);
        console.log(authError);
      });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <Input
          name="email"
          type="email"
          label="Email:"
          register={register({ required: 'Email is required!' })}
          error={errors.email}
        />
        <Input
          name="password"
          type="password"
          label="Password:"
          register={register({ required: 'Password is required!' })}
          error={errors.password}
        />
      </div>
      <Button type="submit">Submit</Button>
      {authError && <FormError>{authError.message}</FormError>}
    </Form>
  );
};

export default LoginForm;
