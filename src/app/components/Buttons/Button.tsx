import React from 'react';
import styled from 'styled-components';

const Button = styled.button<{ size?: string; onClick?: any }>`
  border: 2px solid ${(props) => props.theme.mode.color[100]};
  color: ${(props) => props.theme.mode.color[100]};
  background: none;
  font-size: ${(props) => props.size || '16px'};
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
  &:disabled {
    /* color: grey;
    border-color: grey; */
    cursor: default;
  }
  &:hover {
    /* background: lightgray; */
  }
  &:active {
    /* background: gray; */
  }
`;

export default Button;
