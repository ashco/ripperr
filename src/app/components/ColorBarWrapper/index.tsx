import React from 'react';
import { ThemeContext } from 'styled-components';

import StyledColorBarWrapper from './style';

const ColorBarWrapper: React.FC<{
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
    <StyledColorBarWrapper color={barColor} height={height} width={width}>
      <div className="color-bar" />
      {children}
    </StyledColorBarWrapper>
  );
};

export default ColorBarWrapper;
