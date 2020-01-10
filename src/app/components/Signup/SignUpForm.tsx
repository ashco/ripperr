import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';

import { TextField, signUpVal } from '../Forms';
import { FirebaseContext } from '../Firebase/index';
import { AuthErrorSchema } from '../../common/types';

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

  const [error, setError] = useState<AuthErrorSchema>(false);

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
        <TextField
          label="Username"
          name="username"
          type="text"
          placeholder="Hotdaddy69"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="janedoe@gmail.com"
        />
        <TextField
          label="Password"
          name="passwordOne"
          type="password"
          placeholder="something secret"
        />
        <TextField
          label="Confirm Password"
          name="passwordTwo"
          type="password"
          placeholder="something secret"
        />
        <button type="submit">Sign Up</button>
        {error && <p>{error.message}</p>}
      </Form>
    </Formik>
  );
};

export default SignUpForm;
