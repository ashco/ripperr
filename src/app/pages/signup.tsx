import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import AuthFormContainer from 'features/Auth/AuthFormContainer';
import SignupForm from 'features/Auth/SignupForm';

const SignupPage: NextPage = () => {
  return (
    <SignupPageWrapper>
      <AuthFormContainer title="Sign Up">
        <SignupForm />
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
