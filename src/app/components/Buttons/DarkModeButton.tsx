import React from 'react';
import styled from 'styled-components';

import {
  useThemeModeState,
  useThemeModeDispatch,
} from '../../context/ThemeModeContext';

import { Button } from '../Buttons';

const DarkModeButton = () => {
  const themeModeState = useThemeModeState();
  const themeModeDispatch = useThemeModeDispatch();

  return (
    <StyledDarkModeButton onClick={themeModeDispatch}>
      {themeModeState} Mode
    </StyledDarkModeButton>
  );
};

const StyledDarkModeButton = styled(Button)`
  color: ${(props) => props.theme.mode.background[100]};
  background: ${(props) => props.theme.mode.color[100]};
`;

export default DarkModeButton;
