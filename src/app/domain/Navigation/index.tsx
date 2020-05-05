import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Link from 'next/link';

import { AuthUserContext } from '@/context';
import { useAddMoveMode } from '@/context/AddMoveModeContext';
import { useModalDispatch } from '@/context/ModalContext';

import ButtonWrapper from '@/domain/FilterBar/ButtonWrapper';

import SignOutButton from './SignOutButton';
// import AddBar from './AddBar';

import NavBarWrapper from './style';

import Logo from '@/icons/Logo';
import Times from '@/icons/Times';

const NavBar: React.FC = () => {
  const authUser = useContext(AuthUserContext);
  const themeContext = useContext(ThemeContext);

  return (
    <NavBarWrapper>
      {authUser ? (
        <NavBarAuth color={themeContext.mode.color[100]} />
      ) : (
        <NavBarNonAuth color={themeContext.mode.color[100]} />
      )}
    </NavBarWrapper>
  );
};

const NavLogo: React.FC<{ color: string }> = ({ color }) => {
  const [addMoveMode, setAddMoveMode] = useAddMoveMode();
  const modalDispatch = useModalDispatch();

  const themeContext = React.useContext(ThemeContext);
  const [btnHovered, setBtnHovered] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  function toggleHover() {
    setBtnHovered((hovered) => !hovered);
  }

  function handleCancel(e: any) {
    modalDispatch({ type: 'MODAL_EDIT' });
    setAddMoveMode(false);
  }

  return addMoveMode ? (
    <ButtonWrapper
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      ref={btnRef}
      className="logo"
      onClick={handleCancel}
    >
      <Times
        color={
          btnHovered
            ? themeContext.mode.color[200]
            : themeContext.mode.color[100]
        }
      />
      Cancel
    </ButtonWrapper>
  ) : (
    <Link href="/moves">
      <a className="logo">
        <Logo color={color} />
        Ripperr
      </a>
    </Link>
  );
};

const NavMessage: React.FC = () => {
  const addMoveMode = useAddMoveMode()[0];

  const messageText = addMoveMode ? 'Add New Movement' : '';

  return <h2>{messageText}</h2>;
};

const NavBarAuth: React.FC<{ color: string }> = ({ color }) => (
  <ul>
    <div className="list-group left">
      <li>
        <NavLogo color={color} />
      </li>
    </div>
    <div className="list-group center">
      <NavMessage />
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
        <NavLogo color={color} />
      </li>
    </div>
    <div className="list-group center">
      <NavMessage />
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
