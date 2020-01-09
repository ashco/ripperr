import { NextPage } from 'next';
import PasswordForgotForm from '../components/PasswordForgot/PasswordForgotForm';

const PasswordForgotPage: NextPage = () => (
  <div>
    <h1>Forgot Password?</h1>
    <PasswordForgotForm />
  </div>
);

export default PasswordForgotPage;
