import { NextPage } from 'next';
import styled from 'styled-components';
import SignInForm from '../components/Signin/SignInForm';
import { PasswordForgotLink } from '../components/PasswordForgot/PasswordForgotForm';
import SignUpLink from '../components/Signup/SignUpLink';

const SignInPage: NextPage<{ userAgent: string }> = () => (
  <div>
    <SignInContainer>
      <h1>Sign In</h1>
      <SignInForm />
      <PasswordForgotLink />
      <SignUpLink />
    </SignInContainer>
  </div>
);

const SignInContainer = styled.div`
  max-width: 500px;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.5);
  padding: 24px;
  border-radius: 5px;
  margin: auto;

  h1 {
    font-size: 24px;
  }
`;

export default SignInPage;
