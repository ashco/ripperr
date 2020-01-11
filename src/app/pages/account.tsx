import { useContext } from 'react';
import { NextPage } from 'next';

import { AuthFormContainer } from './signin';
import { withAuthorization } from '../components/Session';
import { IAuthUserContext } from '../components/Firebase/firebase';
import { AuthUserContext } from '../components/Session';
import PasswordForgotForm from '../components/PasswordForgot/PasswordForgotForm';
import PasswordChangeForm from '../components/PasswordChange/PasswordChangeForm';

const AccountPage: NextPage = () => {
  const authUser = useContext(AuthUserContext);
  return (
    <div>
      <h1>{authUser ? `Account: ${authUser.email}` : `Account Page`}</h1>
      <AuthFormContainer>
        <h1>Forgot Password?</h1>
        <PasswordForgotForm />
      </AuthFormContainer>
      <AuthFormContainer>
        <h1>Change Password?</h1>
        <PasswordChangeForm />
      </AuthFormContainer>
    </div>
  );
};
const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(AccountPage);
