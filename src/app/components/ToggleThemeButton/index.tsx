import React from 'react';
import styled from 'styled-components';
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

  function toggleThemeMode() {
    if (theme.mode.type === 'LIGHT') {
      dispatch(setTheme({ themeMode: 'DARK' }));
    } else if (theme.mode.type === 'DARK') {
      dispatch(setTheme({ themeMode: 'LIGHT' }));
    }
  }

  return (
    <Button primary={true} onClick={toggleThemeMode}>
      {buttonText} Mode
    </Button>
  );
};

// const StyledToggleThemeButton = styled(Button)`
//   color: ${(props) => props.theme.mode.background[100]};
//   background: ${(props) => props.theme.mode.color[100]};
// `;

export default ToggleThemeButton;
