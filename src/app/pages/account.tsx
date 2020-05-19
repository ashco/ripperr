import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import AuthUserContext from 'context/AuthUserContext';
import withAuthorization from 'context/withAuthorization';

import AuthFormContainer from 'features/Auth/AuthFormContainer';

import ToggleThemeButton from 'components/ToggleThemeButton';
import PasswordChangeForm from 'features/Auth/PasswordChangeForm';

import { AuthUser } from 'types/types';

const AccountPage: NextPage = () => {
  const authUser = React.useContext(AuthUserContext);

  return (
    <AccountPageWrapper>
      <p className="text" aria-label="account-email">
        {authUser && `Email: ${authUser.email}`}
      </p>
      <AuthFormContainer title="Change Password">
        <PasswordChangeForm />
      </AuthFormContainer>
      <p className="text">Toggle Theme</p>
      <ToggleThemeButton />
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
