import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import PasswordForgotForm from 'features/Auth/PasswordForgotForm';
import AuthContainer from 'components/AuthContainer';

const PasswordForgotPage: NextPage = () => (
  <ForgotPageWrapper>
    <AuthContainer>
      <h1>Forgot Password</h1>
      <PasswordForgotForm />
    </AuthContainer>
  </ForgotPageWrapper>
);

const ForgotPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
`;

export default PasswordForgotPage;
