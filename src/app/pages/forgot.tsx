﻿import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import AuthFormContainer from '../features/Auth/AuthFormContainer';
import PasswordForgotForm from '../features/Auth/PasswordForgotForm';

const PasswordForgotPage: NextPage = () => (
  <ForgotPageWrapper>
    <AuthFormContainer title="Forgot Password?">
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
