import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import SignInForm from '../components/Signin/SignInForm';
import { PasswordForgotLink } from '../components/PasswordForgot/PasswordForgotForm';
import SignUpLink from '../components/Signup/SignUpLink';

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
`;

export const AuthFormContainer = styled.div`
  max-width: 500px;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.5);
  padding: 24px;
  border-radius: 5px;
  margin: 2rem auto;
  /* background-color: ${(props) => props.theme.color.blue[100]}; */
  background: ${(props) => props.theme.mode.background[300]};
  input,
  textarea {
    border: 2px solid ${(props) => props.theme.mode.color[200]};
    background: none;
    color: ${(props) => props.theme.mode.color[100]};
  }
  h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }
  .links {
    display: grid;
    text-align: center;
    gap: 0.25rem;
    a {
      color: ${(props) => props.theme.mode.color[100]};
      font-weight: 600;
      /* margin-bottom: 0.25rem; */
    }
    /* a:last-child {
      margin-bottom: auto;
    } */
  }
`;

export default SignInPage;
