import React from 'react';
import { ThemeContext } from 'styled-components';

import StyledColorBarWrapper from './style';

interface Props {
  className?: string;
  color?: string;
  barHeight?: string;
  // width?: string;
  onClick?: (e: any) => void;
}

const ColorBarWrapper: React.FC<Props> = ({
  className,
  color = 'neutral',
  barHeight = '8px',
  // width,
  children,
  onClick,
}) => {
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
    <StyledColorBarWrapper
      className={className}
      color={barColor}
      barHeight={barHeight}
      // width={width}
      onClick={onClick}
    >
      <div className="color-bar" />
      {children}
    </StyledColorBarWrapper>
  );
};

export default ColorBarWrapper;
