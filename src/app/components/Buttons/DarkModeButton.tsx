import React from 'react';
import styled from 'styled-components';

import {
  useThemeModeState,
  useThemeModeDispatch,
  ThemeModeActionType,
} from '../../context/ThemeModeContext';

import { Button } from '../Buttons';

const DarkModeButton = () => {
  const themeModeState = useThemeModeState();
  const themeModeDispatch = useThemeModeDispatch();

  const modeType = themeModeState.mode.type;

  const buttonText = modeType === 'Light' ? 'Dark' : 'Light';

  function toggleThemeMode() {
    let actionType: ThemeModeActionType = 'LIGHT_MODE';
    if (modeType === 'Light') {
      actionType = 'DARK_MODE';
    }

    themeModeDispatch({ type: actionType });
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
