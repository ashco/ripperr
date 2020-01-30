import React, { useContext } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { AuthUserContext, withAuthorization } from '../context';

import { AuthFormContainer } from './signin';
import PasswordForgotForm from '../components/PasswordForgot/PasswordForgotForm';
import PasswordChangeForm from '../components/PasswordChange/PasswordChangeForm';

import { IAuthUserContext } from '../common/types';

const AccountPage: NextPage = () => {
  const authUser = useContext(AuthUserContext);
  return (
    <AccountPageWrapper>
      <h1>{authUser ? `Account: ${authUser.email}` : `Account Page`}</h1>
      <AuthFormContainer>
        <PasswordForgotForm />
      </AuthFormContainer>
      <AuthFormContainer>
        <PasswordChangeForm />
      </AuthFormContainer>
    </AccountPageWrapper>
  );
};

const AccountPageWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(AccountPage);
