import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { AuthUserContext } from '../../context';

import SignOutButton from './SignOutButton';

import Logo from '../../static/icons/fire-alt-solid.svg';

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
    <div className="top-group">
      <li>
        <Link href="/movements">
          <a className="logo">
            <img src={Logo} alt="Ripperr Icon" />
            Ripperr
          </a>
        </Link>
      </li>
      <li>
        <Link href="/movements">
          <a>Movements</a>
        </Link>
      </li>
    </div>
    <div className="bottom-group">
      <li>
        <Link href="/account">
          <a>Account</a>
        </Link>
      </li>
      <li>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </div>
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
  background-color: ${({ theme }) => theme.color.neutral[100]};
  opacity: 0.85;
  box-shadow: ${(props) => props.theme.shadow[2]};
  height: 100%;
  grid-area: navigation;
  z-index: 99;
  ul {
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;
    li {
      padding: 16px;
    }
    .logo {
      font-size: 22px;
      display: grid;
      gap: 0.5rem;
      grid-template-columns: 40px auto;
      align-items: center;
    }
  }
  /* ul {
    display: flex;
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
  } */
`;

const LinksWrapper = styled.div``;
const ProfileWrapper = styled.div`
  grid-area: profile;
`;

export default Navigation;
