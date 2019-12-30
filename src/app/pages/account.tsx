import { NextPage } from 'next';

const AccountPage: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <h1>About world</h1>
);

AccountPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default AccountPage;
