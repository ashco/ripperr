import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import AuthUserContext from 'context/AuthUserContext';
import withAuthorization from 'context/withAuthorization';

import AuthFormContainer from 'features/Auth/AuthFormContainer';
import PasswordForgotForm from 'features/Auth/PasswordForgotForm';

import DarkModeButton from 'components/DarkModeButton';
import PasswordChangeForm from 'components/PasswordChangeForm';

import { AuthUser } from 'types/types';

const AccountPage: NextPage = () => {
  const authUser = React.useContext(AuthUserContext);

  return (
    <AccountPageWrapper>
      <div aria-label="account-email">
        {authUser && `Email: ${authUser.email}`}
      </div>
      <AuthFormContainer title="Forgot Password?">
        <PasswordForgotForm />
      </AuthFormContainer>
      <AuthFormContainer title="Change Password">
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
  [aria-label='account-email'] {
    text-align: center;
    font-size: 20px;
    margin-top: 2rem;
    color: ${(p) => p.theme.mode.color[100]};
  }
`;

const condition = (authUser: AuthUser): boolean => authUser !== null;

export default withAuthorization(condition)(AccountPage);
