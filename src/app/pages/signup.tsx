import { NextPage } from 'next';

import SignUpForm from '../components/Signup/SignUpForm';

const SignUpPage: NextPage = () => {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
