import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'store';
import { setTheme } from 'store/ui';

import Button from 'components/Button';

const ToggleThemeButton = () => {
  const { theme } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const buttonText = theme.mode.type === 'Light' ? 'Dark' : 'Light';

  function toggleThemeMode() {
    if (theme.mode.type === 'Light') {
      dispatch(setTheme({ themeMode: 'DARK' }));
    } else if (theme.mode.type === 'Dark') {
      dispatch(setTheme({ themeMode: 'LIGHT' }));
    }
  }

  return (
    <StyledToggleThemeButton onClick={toggleThemeMode}>
      {buttonText} Mode
    </StyledToggleThemeButton>
  );
};

const StyledToggleThemeButton = styled(Button)`
  color: ${(props) => props.theme.mode.background[100]};
  background: ${(props) => props.theme.mode.color[100]};
`;

export default ToggleThemeButton;
