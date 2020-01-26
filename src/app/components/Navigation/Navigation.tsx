import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { AuthUserContext } from '../../context';

import SignOutButton from './SignOutButton';

const Navigation: React.FC = () => {
  const authUser = useContext(AuthUserContext);
  return (
    <NavigationWrapper>
      {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </NavigationWrapper>
  );
};

const NavigationAuth: React.FC = () => (
  <ul>
    <li>
      <Link href="/">
        <a className="logo">Ripperr</a>
      </Link>
    </li>
    <li>
      <Link href="/movements">
        <a>Movements</a>
      </Link>
    </li>
    <li>
      <Link href="/account">
        <a>Account</a>
      </Link>
    </li>
    {/* <li>
      <Link href="/admin">
        <a>Admin</a>
      </Link>
    </li> */}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth: React.FC = () => (
  <ul>
    <li>
      <Link href="/">
        <a className="logo">Ripperr</a>
      </Link>
    </li>
    <li>
      <Link href="/signin">
        <a>Sign In</a>
      </Link>
    </li>
  </ul>
);

const NavigationWrapper = styled.nav`
  background-color: ${(props) => props.theme.color.blue[100]};
  box-shadow: ${(props) => props.theme.shadow[0]};
  grid-area: navigation;
  ul {
    display: flex;
    justify-content: center;
    li:first-child {
      margin-right: auto;
    }
    li {
      padding: 16px;
    }
    .logo {
      font-size: ${(props) => props.theme.font[4]};
    }
  }
`;

const LinksWrapper = styled.div``;
const ProfileWrapper = styled.div`
  grid-area: profile;
`;

export default Navigation;
