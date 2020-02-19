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
    <div className="list-group left">
      <li>
        <Link href="/moves">
          <a className="logo">
            <img src={Logo} alt="Ripperr Icon" />
            Ripperr
          </a>
        </Link>
      </li>
    </div>
    <div className="list-group right">
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
    </div>
  </ul>
);

const NavigationNonAuth: React.FC = () => (
  <ul>
    <div className="list-group left">
      <li>
        <Link href="/movements">
          <a className="logo">
            <img src={Logo} alt="Ripperr Icon" />
            Ripperr
          </a>
        </Link>
      </li>
    </div>
    <div className="list-group right">
      <li>
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      </li>
    </div>
  </ul>
);

const NavigationWrapper = styled.nav`
  background-color: ${({ theme }) => theme.color.neutral[100]};
  opacity: 0.85;
  box-shadow: ${(props) => props.theme.shadow[2]};
  grid-area: navigation;
  z-index: 99;
  ul {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    height: 100%;
    padding: 0 2rem;
    div.list-group {
      display: grid;
      grid-auto-flow: column;
      place-items: center;
      gap: 2rem;
      /* justify-content: space-between; */
    }
    div.left {
      place-self: center start;
    }
    div.right {
      place-self: center end;
    }
    .logo {
      font-size: 22px;
      display: grid;
      gap: 0.5rem;
      grid-template-columns: 32px auto;
      align-items: center;
    }
  }
`;

export default Navigation;
