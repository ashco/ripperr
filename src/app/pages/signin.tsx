import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import AuthFormContainer from '@/domain/Auth/AuthFormContainer';
import SignInForm from '@/domain/Auth/SignInForm';
import { PasswordForgotLink } from '@/domain/Auth/PasswordForgotForm';
import SignUpLink from '@/components/SignUpLink';

const SignInPage: NextPage<{ userAgent: string }> = () => (
  <SignInPageWrapper>
    <AuthFormContainer>
      <SignInForm />
      <div className="links">
        <SignUpLink />
        <PasswordForgotLink />
      </div>
    </AuthFormContainer>
  </SignInPageWrapper>
);

const SignInPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
  .links {
    margin-top: 1rem;
  }
`;

export default SignInPage;
