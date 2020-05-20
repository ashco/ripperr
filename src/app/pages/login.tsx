import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import AuthContainer from 'components/AuthContainer';
import LoginForm from 'features/Auth/LoginForm';
import { PasswordForgotLink } from 'features/Auth/PasswordForgotForm';
import SignUpLink from 'components/SignUpLink';

const LoginPage: NextPage<{ userAgent: string }> = () => (
  <LoginPageWrapper>
    <AuthContainer>
      <h1>Login</h1>
      <LoginForm />
      <div className="footer-links">
        <SignUpLink />
        <PasswordForgotLink />
      </div>
    </AuthContainer>
  </LoginPageWrapper>
);

const LoginPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
`;

export default LoginPage;
