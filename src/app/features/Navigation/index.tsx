import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'store';
import { setModalMode, setIsAddMoveMode, IsAddMoveMode } from 'store/ui';
import { ThemeContext } from 'styled-components';
import Link from 'next/link';

import AuthUserContext from 'context/AuthUserContext';
// import { useAddMoveMode } from 'context/AddMoveModeContext';
// import { useModalDispatch } from 'context/ModalContext';

import NotificationBanner from 'components/NotificationBanner';
import Button from 'components/Button';

import SignOutButton from './SignOutButton';

import NavBarWrapper from './style';

import Icon from 'icons';
import useNotification from 'hooks/useNotification';

const NavBar: React.FC = () => {
  const authUser = useContext(AuthUserContext);
  const themeContext = useContext(ThemeContext);

  const { isAddMoveMode } = useSelector((state) => state.ui);

  const color = themeContext.mode.color[100];

  return (
    <>
      {/* <NotificationBanner /> */}
      <NavBarWrapper>
        {authUser ? (
          <NavBarAuth color={color} isAddMoveMode={isAddMoveMode} />
        ) : (
          <NavBarNonAuth color={color} />
        )}
      </NavBarWrapper>
    </>
  );
};

const NavLogo: React.FC<{
  color: string;
}> = ({ color }) => {
  return (
    <Link href="/moves">
      <a className="logo">
        <Icon name="logo" fill={color} />
        Ripperr
      </a>
    </Link>
  );
};

const CancelButton: React.FC<{
  color: string;
}> = ({ color }) => {
  const dispatch = useDispatch();

  function handleCancel(e: any) {
    // Find way to determine if edit or add.
    dispatch(setModalMode('EDIT'));
    dispatch(setIsAddMoveMode(false));
  }

  return (
    <Button className="logo" onClick={handleCancel}>
      <Icon name="times" fill={color} />
      Cancel
    </Button>
  );
};

const NavBarAuth: React.FC<{
  color: string;
  isAddMoveMode?: IsAddMoveMode;
}> = ({ color, isAddMoveMode }) => {
  const messageText = isAddMoveMode ? 'Add New Movement' : '';

  return (
    <ul>
      <div className="list-group left">
        <li>
          {isAddMoveMode ? (
            <CancelButton color={color} />
          ) : (
            <NavLogo color={color} />
          )}
        </li>
      </div>
      <div className="list-group center">
        <h2>{messageText}</h2>
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
};

const NavBarNonAuth: React.FC<{ color: string }> = ({ color }) => (
  <ul>
    <div className="list-group left">
      <li>
        <NavLogo color={color} />
      </li>
    </div>
    <div className="list-group center"></div>
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
