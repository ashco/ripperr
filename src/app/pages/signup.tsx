import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import AuthFormContainer from 'features/Auth/AuthFormContainer';
import SignUpForm from 'features/Auth/SignUpForm';

const SignupPage: NextPage = () => {
  return (
    <SignupPageWrapper>
      <AuthFormContainer title="Sign Up">
        <SignUpForm />
      </AuthFormContainer>
    </SignupPageWrapper>
  );
};

const SignupPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
`;

export default SignupPage;
