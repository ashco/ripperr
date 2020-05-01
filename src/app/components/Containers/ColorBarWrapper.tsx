import React from 'react';
import styled, { ThemeContext } from 'styled-components';

const ColorBarWrapper: React.FC<{ color: string; type?: string }> = ({
  color,
  type,
  children,
}) => {
  const theme = React.useContext(ThemeContext);

  if (color === 'green') {
    color = theme.color.logo;
  } else if (color === 'red') {
    color = theme.color.red[400];
  } else if (color === 'orange') {
    color = theme.color.orange[500];
  } else if (color === 'blue') {
    color = theme.color.blue[500];
  } else if (color === 'purple') {
    color = theme.color.purple[500];
  }

  return (
    <StyledColorBarWrapper color={color} type={type}>
      <div className="color-bar" />
      {children}
    </StyledColorBarWrapper>
  );
};

const StyledColorBarWrapper = styled.div<{ color: string; type?: string }>`
  display: grid;
  grid-template-rows: ${(props) => (props.type === 'thin' ? '5px' : '8px')} auto;
  .color-bar {
    width: 90%;
    margin: 0 auto;
    background: ${(props) => props.color};
  }
`;

export default ColorBarWrapper;
