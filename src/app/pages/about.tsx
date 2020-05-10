import React from 'react';
import { NextPage } from 'next';

const AboutPage: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <h1>About world</h1>
);

AboutPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default AboutPage;
