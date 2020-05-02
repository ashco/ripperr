import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Link from 'next/link';

import { AuthUserContext } from '@/context';

import SignOutButton from './SignOutButton';

import NavigationWrapper from './style';

import Logo from '@/icons/Logo';

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

export default Navigation;
