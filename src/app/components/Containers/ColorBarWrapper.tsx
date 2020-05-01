import React from 'react';
import styled from 'styled-components';

const ColorBarWrapper: React.FC<{ color: string }> = ({ color, children }) => {
  return (
    <StyledColorBarWrapper color={color}>
      <div className="color-bar" />
      {children}
    </StyledColorBarWrapper>
  );
};

const StyledColorBarWrapper = styled.div<{ color: string }>`
  display: grid;
  grid-template-rows: 0.5rem auto;
  .color-bar {
    width: 90%;
    margin: 0 auto;
    background: ${(props) => props.theme.color.purple[500]};
  }
`;

export default ColorBarWrapper;
