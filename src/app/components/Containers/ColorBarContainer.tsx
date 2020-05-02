﻿import React from 'react';
import styled, { ThemeContext } from 'styled-components';

const ColorBarContainer: React.FC<{
  color?: string;
  height?: string;
  width?: string;
}> = ({ color, height, width, children }) => {
  const theme = React.useContext(ThemeContext);

  let barColor;
  if (color === 'green') {
    barColor = theme.color.logo;
  } else if (color === 'red') {
    barColor = theme.color.red[400];
  } else if (color === 'orange') {
    barColor = theme.color.orange[500];
  } else if (color === 'blue') {
    barColor = theme.color.blue[500];
  } else if (color === 'purple') {
    barColor = theme.color.purple[500];
  } else if (color === 'neutral') {
    barColor = theme.mode.background[400];
  } else {
    barColor = theme.mode.background[400];
  }

  return (
    <StyledColorBarContainer color={barColor} height={height}>
      <div className="color-bar" />
      {children}
    </StyledColorBarContainer>
  );
};

const StyledColorBarContainer = styled.div<{
  color: string;
  height?: string;
  width?: string;
}>`
  display: grid;
  grid-template-rows: ${(props) => (props.height ? props.height : '8px')} auto;
  .color-bar {
    width: ${(props) => (props.width ? props.width : '90%')};
    margin: 0 auto;
    background: ${(props) => props.color};
  }
`;

export default ColorBarContainer;