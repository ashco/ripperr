import React from 'react';
import styled from 'styled-components';

const ModalBackground: React.FC = ({ children }) => {
  return <StyledModalBackground>{children}</StyledModalBackground>;
};

const StyledModalBackground = styled.div`
  z-index: 900;
  background-color: ${(props) => props.theme.mode.backgroundOpacity[100]};
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  align-content: center;
  justify-content: center;
`;

export default ModalBackground;
