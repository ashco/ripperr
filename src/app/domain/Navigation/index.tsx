import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Link from 'next/link';

import { AuthUserContext } from '@/context';
import { useAddMoveMode } from '@/context/AddMoveModeContext';

import SignOutButton from './SignOutButton';
import AddBar from './AddBar';

import NavBarWrapper from './style';

import Logo from '@/icons/Logo';

const NavBar: React.FC = () => {
  const authUser = useContext(AuthUserContext);
  const themeContext = useContext(ThemeContext);

  const addMoveMode = useAddMoveMode()[0];

  return (
    <NavBarWrapper>
      {addMoveMode ? (
        <AddBar />
      ) : authUser ? (
        <NavBarAuth color={themeContext.mode.color[100]} />
      ) : (
        <NavBarNonAuth color={themeContext.mode.color[100]} />
      )}
    </NavBarWrapper>
  );
};

const NavBarAuth: React.FC<{ color: string }> = ({ color }) => (
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

const NavBarNonAuth: React.FC<{ color: string }> = ({ color }) => (
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

export default NavBar;
