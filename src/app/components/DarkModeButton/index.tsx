import React from 'react';
import styled from 'styled-components';

import { useThemeMode } from 'context/ThemeModeContext';

import Button from 'components/Button';

const DarkModeButton = () => {
  const [theme, setTheme] = useThemeMode();

  const buttonText = theme.mode.type === 'Light' ? 'Dark' : 'Light';

  function toggleThemeMode() {
    if (theme.mode.type === 'Light') {
      setTheme('DARK');
    } else if (theme.mode.type === 'Dark') {
      setTheme('LIGHT');
    }
  }

  return (
    <StyledDarkModeButton onClick={toggleThemeMode}>
      {buttonText} Mode
    </StyledDarkModeButton>
  );
};

const StyledDarkModeButton = styled(Button)`
  color: ${(props) => props.theme.mode.background[100]};
  background: ${(props) => props.theme.mode.color[100]};
`;

export default DarkModeButton;
