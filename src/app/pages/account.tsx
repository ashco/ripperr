import { NextPage } from 'next';

import PasswordForgetForm from '../components/PasswordForgot/PasswordForgotForm';
import PasswordChangeForm from '../components/PasswordChange/PasswordChangeForm';

const AccountPage: NextPage = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

export default AccountPage;
