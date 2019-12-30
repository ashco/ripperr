import { NextPage } from 'next';

const HomePage: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <h1>Home world</h1>
);

HomePage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default HomePage;
