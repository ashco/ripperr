import React from 'react';
import styled from 'styled-components';

const Button = styled.button<{ size?: string; onClick?: any }>`
  border: 2px solid ${(props) => props.theme.mode.color[100]};
  color: ${(props) => props.theme.mode.color[100]};
  /* border: 2px solid rgba(84, 255, 180, 1); */
  background: none;
  font-size: ${(props) => props.size || '16px'};
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
  &:hover {
    background: ${(props) => props.theme.mode.color[100]};
    color: ${(props) => props.theme.mode.background[200]};
  }
  &:active {
    /* background: gray; */
  }
`;

export default Button;
