import Link from 'next/link';

const SignUpLink = () => (
  <p>
    Don't have an account?{' '}
    <Link href="/signup">
      <a>Sign Up</a>
    </Link>
  </p>
);

export default SignUpLink;
