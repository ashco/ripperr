import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import AuthFormContainer from 'features/Auth/AuthFormContainer';
import LoginForm from 'features/Auth/LoginForm';
import { PasswordForgotLink } from 'features/Auth/PasswordForgotForm';
import SignUpLink from 'components/SignUpLink';

const LoginPage: NextPage<{ userAgent: string }> = () => (
  <LoginPageWrapper>
    <AuthFormContainer title="Login">
      <LoginForm />
      <div className="links">
        <SignUpLink />
        <PasswordForgotLink />
      </div>
    </AuthFormContainer>
  </LoginPageWrapper>
);

const LoginPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
`;

export default LoginPage;
