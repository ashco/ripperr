import React, { useContext } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { AuthUserContext, withAuthorization } from '../context';

import { DarkModeButton } from '../components/Button';
import AuthFormContainer from '../components/Containers/AuthFormContainer';
import PasswordForgotForm from '../domain/PasswordForgot/PasswordForgotForm';
import PasswordChangeForm from '../components/PasswordChange/PasswordChangeForm';

import { IAuthUserContext } from '../types/types';

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
      <DarkModeButton />
    </AccountPageWrapper>
  );
};

const AccountPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 2rem;
  h1 {
    font-size: 20px;
    margin-top: 2rem;
    color: ${(props) => props.theme.mode.color[100]};
  }
`;

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(AccountPage);
