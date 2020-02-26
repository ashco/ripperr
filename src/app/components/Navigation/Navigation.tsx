import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Link from 'next/link';

import { AuthUserContext } from '../../context';

import SignOutButton from './SignOutButton';

// import Logo from '../../static/icons/fire-alt-solid.svg';
import Logo from '../../icons/Logo';

const Navigation: React.FC = () => {
  const authUser = useContext(AuthUserContext);
  const themeContext = useContext(ThemeContext);
  return (
    <NavigationWrapper>
      {authUser ? (
        <NavigationAuth color={themeContext.mode.color[100]} />
      ) : (
        <NavigationNonAuth color={themeContext.mode.color[100]} />
      )}
    </NavigationWrapper>
  );
};

const NavigationAuth: React.FC<{ color: string }> = ({ color }) => (
  <ul>
    <div className="list-group left">
      <li>
        <Link href="/moves">
          <a className="logo">
            <Logo color={color} />
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

const NavigationNonAuth: React.FC<{ color: string }> = ({ color }) => (
  <ul>
    <div className="list-group left">
      <li>
        <Link href="/movements">
          <a className="logo">
            <Logo color={color} />
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
  /* background-color: ${({ theme }) => theme.color.neutral[100]}; */
  background-color: ${({ theme }) => theme.mode.background[300]};
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
    a {
      color: ${(props) => props.theme.mode.color[100]};
    }
  }
`;

export default Navigation;
