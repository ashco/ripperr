import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { AuthUserContext } from '../../context';

import SignOutButton from './SignOutButton';

import Logo from '../../static/images/fire-alt-solid.svg';

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
      <Link href="/movements">
        <a className="logo">
          <img src={Logo} alt="Ripperr Icon" />
          Ripperr
        </a>
      </Link>
    </li>
    {/* <li>
      <Link href="/movements">
        <a>Movements</a>
      </Link>
    </li> */}
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
      <Link href="/movements">
        <a className="logo">
          <img src={Logo} alt="Ripperr Icon" />
          Ripperr
        </a>
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
  height: ${(p) => p.theme.space[7]};
  grid-area: navigation;
  ul {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 100%;
    li:first-child {
      margin-right: auto;
      height: 100%;
    }
    li {
      padding: 16px;
    }
    .logo {
      font-size: ${(props) => props.theme.font[4]};
      display: flex;
      align-items: center;
      height: 100%;
      img {
        height: 100%;
        margin-right: 0.5rem;
      }
    }
  }
`;

const LinksWrapper = styled.div``;
const ProfileWrapper = styled.div`
  grid-area: profile;
`;

export default Navigation;
