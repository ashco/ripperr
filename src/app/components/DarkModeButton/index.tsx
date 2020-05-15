import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
// import { useThemeMode } from 'context/ThemeModeContext';
import { useSelector, useDispatch } from 'store';
import { updateTheme } from 'store/theme';

import Button from 'components/Button';

const DarkModeButton = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const buttonText = theme.mode.type === 'Light' ? 'Dark' : 'Light';

  function toggleThemeMode() {
    if (theme.mode.type === 'Light') {
      dispatch(updateTheme({ themeMode: 'DARK' }));
    } else if (theme.mode.type === 'Dark') {
      dispatch(updateTheme({ themeMode: 'LIGHT' }));
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
