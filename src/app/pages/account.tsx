import { useContext } from 'react';
import { NextPage } from 'next';
import { withAuthorization } from '../components/Session';
import { InterfaceAuthUserContext } from '../components/Firebase/firebase';
import { AuthUserContext } from '../components/Session';

import PasswordForgetForm from '../components/PasswordForgot/PasswordForgotForm';
import PasswordChangeForm from '../components/PasswordChange/PasswordChangeForm';

const AccountPage: NextPage = () => {
  const authUser = useContext(AuthUserContext);
  return (
    <div>
      <h1>{authUser ? `Account: ${authUser.email}` : `Account Page`}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
};
const condition = (authUser: InterfaceAuthUserContext): boolean =>
  authUser !== null;

export default withAuthorization(condition)(AccountPage);
