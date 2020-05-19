import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Form from 'components/Form';
import Button from 'components/Button';
import FormError from 'components/FormError';

import FirebaseContext from 'context/FirebaseContext';
import { AuthError } from 'types/types';

import { signupSchema } from 'utils/validation-schema';

interface SignupForm {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const defaultValues: SignupForm = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignupForm: React.FC = () => {
  const firebase = React.useContext(FirebaseContext);
  const router = useRouter();

  const [authError, setAuthError] = React.useState<AuthError | false>(false);

  const { register, handleSubmit, reset, errors } = useForm<SignupForm>({
    mode: 'onBlur',
    defaultValues,
    validationSchema: signupSchema,
  });

  function onSubmit({ username, email, password }: SignupForm) {
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        if (authUser.user) {
          return firebase.user(authUser.user.uid).set({
            username,
            email,
          });
        }
      })
      .then(() => {
        reset();
        router.push('/moves');
      })
      .catch((err) => {
        setAuthError(err);
        console.log(err);
      });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="input-container">
        <Input
          name="username"
          type="text"
          label="Username:"
          register={register()}
          error={errors.username}
        />
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
        <Input
          name="passwordConfirm"
          type="password"
          label="Confirm Password:"
          register={register()}
          error={errors.passwordConfirm}
        />
      </div>
      <Button type="submit">Submit</Button>
      {authError && <FormError>{authError.message}</FormError>}
    </Form>
  );
};

export default SignupForm;
