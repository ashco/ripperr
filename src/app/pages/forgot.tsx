import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import AuthFormContainer from '../components/Containers/AuthFormContainer';
import PasswordForgotForm from '../components/PasswordForgot/PasswordForgotForm';

const PasswordForgotPage: NextPage = () => (
  <ForgotPageWrapper>
    <AuthFormContainer>
      <h1>Forgot Password?</h1>
      <PasswordForgotForm />
    </AuthFormContainer>
  </ForgotPageWrapper>
);

const ForgotPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
`;

export default PasswordForgotPage;
