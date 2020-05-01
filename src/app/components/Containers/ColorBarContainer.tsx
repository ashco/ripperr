import React from 'react';
import styled, { ThemeContext } from 'styled-components';

const ColorBarContainer: React.FC<{ color?: string; type?: string }> = ({
  color,
  type,
  children,
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
  } else {
    barColor = theme.color.neutral[500];
  }

  return (
    <StyledColorBarContainer color={barColor} type={type}>
      <div className="color-bar" />
      {children}
    </StyledColorBarContainer>
  );
};

const StyledColorBarContainer = styled.div<{ color: string; type?: string }>`
  display: grid;
  grid-template-rows: ${(props) => (props.type === 'thin' ? '5px' : '8px')} auto;
  .color-bar {
    width: 90%;
    margin: 0 auto;
    background: ${(props) => props.color};
  }
`;

export default ColorBarContainer;
