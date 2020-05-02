import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import AuthFormContainer from '../components/AuthFormContainer';
import SignUpForm from '../domain/Signup/SignUpForm';

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
