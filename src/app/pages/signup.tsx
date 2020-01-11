import { NextPage } from 'next';

import { AuthFormContainer } from './signin';
import SignUpForm from '../components/Signup/SignUpForm';

const SignUpPage: NextPage = () => {
  return (
    <AuthFormContainer>
      <h1>SignUp</h1>
      <SignUpForm />
    </AuthFormContainer>
  );
};

export default SignUpPage;
