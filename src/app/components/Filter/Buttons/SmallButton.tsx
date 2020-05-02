import React from 'react';
import styled from 'styled-components';

const SmallButton = styled.button`
  display: grid;
  place-items: center;
  background-color: ${(props) => props.theme.mode.background[300]};
  box-shadow: ${(props) => props.theme.shadow[2]};
  border: none;
`;

export default SmallButton;
