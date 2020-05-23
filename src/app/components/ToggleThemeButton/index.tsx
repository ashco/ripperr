import React from 'react';
import { useSelector, useDispatch } from 'store';
import { setTheme } from 'store/ui';

import Button from 'components/Button';

import singleCapString from 'utils/single-cap-string';

const ToggleThemeButton = () => {
  const { theme } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const buttonText = singleCapString(
    theme.mode.type === 'LIGHT' ? 'DARK' : 'LIGHT',
  );

  function toggleThemeMode(): void {
    theme.mode.type === 'LIGHT'
      ? dispatch(setTheme({ themeMode: 'DARK' }))
      : dispatch(setTheme({ themeMode: 'LIGHT' }));
  }

  return (
    <Button primary={true} onClick={toggleThemeMode}>
      {buttonText} Mode
    </Button>
  );
};

export default ToggleThemeButton;
