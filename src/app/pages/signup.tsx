import React from 'react';
import { NextPage } from 'next';

import { AuthFormContainer } from './signin';
import SignUpForm from '../components/Signup/SignUpForm';

const SignUpPage: NextPage = () => {
  return (
    <AuthFormContainer>
      <SignUpForm />
    </AuthFormContainer>
  );
};

export default SignUpPage;
