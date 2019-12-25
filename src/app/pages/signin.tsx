import { NextPage } from 'next';
import SignInForm from '../components/Signin/SignInForm';
import SignUpLink from '../components/Signup/SignUpLink';

const SignInPage: NextPage<{ userAgent: string }> = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

export default SignInPage;
