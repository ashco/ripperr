import { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { AuthUserContext } from '../Session';
import SignOutButton from './SignOutButton';

const Navigation = () => {
  const authUser = useContext(AuthUserContext);
  console.log(authUser);
  return (
    <div>{authUser.authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
  );
};

const NavigationAuth = () => (
  <ul>
    <li>
      <Link href="/">
        <a>Landing</a>
      </Link>
    </li>
    <li>
      <Link href="/home">
        <a>Home</a>
      </Link>
    </li>
    <li>
      <Link href="/account">
        <a>Account</a>
      </Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link href="/">
        <a>Landing</a>
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
  display: grid;
  grid-template-rows: auto 80px;
  grid-area: sidebar;
  grid-template-areas:
    'links'
    'profile';
  padding: 1rem;
`;

const LinksWrapper = styled.div``;
const ProfileWrapper = styled.div`
  grid-area: profile;
`;

export default Navigation;
