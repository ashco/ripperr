import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import AuthFormContainer from 'domain/Auth/AuthFormContainer';
import SignUpForm from 'domain/Auth/SignUpForm';

const SignUpPage: NextPage = () => {
  return (
    <SignUpPageWrapper>
      <AuthFormContainer>
        <SignUpForm />
      </AuthFormContainer>
    </SignUpPageWrapper>
  );
};

const SignUpPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
`;

export default SignUpPage;
