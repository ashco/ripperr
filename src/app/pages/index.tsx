import { NextPage } from 'next';

const IndexPage: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <h1>Index Page</h1>
);

IndexPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default IndexPage;
