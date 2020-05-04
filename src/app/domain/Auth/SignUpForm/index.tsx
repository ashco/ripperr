import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';

import InputField from '@/domain/MovementForm/InputField';
import { signUpVal } from '@/domain/MovementForm/validationSchema';
import FormError from '@/components/FormError';
import Button from '@/components/Button';

import { FirebaseContext } from '@/context';
import { IAuthError } from '@/types/types';

interface ISignUpFormValues {
  username: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
}

const INITIAL_VALUES: ISignUpFormValues = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
};

const SignUpForm: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();

  const [error, setError] = useState<IAuthError | false>(false);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={signUpVal}
      onSubmit={({ username, email, passwordOne }, { resetForm }) => {
        firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
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
            resetForm();
            router.push('/');
          })
          .catch((error) => {
            setError(error);
            console.log(error);
          });
      }}
    >
      <Form>
        <InputField
          // label="Username"
          name="username"
          type="text"
          placeholder="Username"
        />
        <InputField
          // label="Email"
          name="email"
          type="email"
          placeholder="Email"
        />
        <InputField
          // label="Password"
          name="passwordOne"
          type="password"
          placeholder="Password"
        />
        <InputField
          // label="Confirm Password"
          name="passwordTwo"
          type="password"
          placeholder="Confirm Password"
        />
        <Button type="submit">Sign Up</Button>
        {error && <FormError>{error.message}</FormError>}
      </Form>
    </Formik>
  );
};

export default SignUpForm;
