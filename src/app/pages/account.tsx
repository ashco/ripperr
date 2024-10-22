﻿import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import AuthUserContext from 'context/AuthUserContext';
import withAuthorization from 'context/withAuthorization';

import PasswordChangeForm from 'features/Auth/PasswordChangeForm';

import AuthContainer from 'components/AuthContainer';
import ToggleThemeButton from 'components/ToggleThemeButton';

import { AuthUser } from 'types';

const AccountPage: NextPage = () => {
  const authUser = React.useContext(AuthUserContext);

  return (
    <AccountPageWrapper>
      <p className="text" aria-label="account-email">
        {authUser && `Email: ${authUser.email}`}
      </p>
      <AuthContainer>
        <h1>Change Password</h1>
        <PasswordChangeForm />
      </AuthContainer>
      <AuthContainer>
        <h1>Toggle Theme</h1>
        <ToggleThemeButton />
      </AuthContainer>
    </AccountPageWrapper>
  );
};

const AccountPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 2rem;
  .text {
    text-align: center;
    font-size: 20px;
    margin-top: 2rem;
    color: ${(p) => p.theme.mode.color[100]};
  }
`;

const condition = (authUser: AuthUser): boolean => authUser !== null;

export default withAuthorization(condition)(AccountPage);
