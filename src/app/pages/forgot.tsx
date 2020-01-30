import React from 'react';
import { NextPage } from 'next';

import { AuthFormContainer } from './signin';
import PasswordForgotForm from '../components/PasswordForgot/PasswordForgotForm';

const PasswordForgotPage: NextPage = () => (
  <AuthFormContainer>
    <h1>Forgot Password?</h1>
    <PasswordForgotForm />
  </AuthFormContainer>
);

export default PasswordForgotPage;
