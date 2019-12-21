import { NextPage } from 'next';

const About: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <h1>About world</h1>
);

About.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default About;