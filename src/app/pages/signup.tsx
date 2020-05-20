import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import AuthContainer from 'components/AuthContainer';
import SignUpForm from 'features/Auth/SignUpForm';

const SignupPage: NextPage = () => {
  return (
    <SignupPageWrapper>
      <AuthContainer>
        <h1>Sign Up</h1>
        <SignUpForm />
      </AuthContainer>
    </SignupPageWrapper>
  );
};

const SignupPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
`;

export default SignupPage;
