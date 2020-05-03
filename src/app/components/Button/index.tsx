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
    cursor: default;
  }
  &:hover {
    background: ${(props) => props.theme.mode.color[100]};
    color: ${(props) => props.theme.mode.background[200]};
  }
  &:active {
    /* background: gray; */
  }
  &.btn-delete {
    border-color: ${(props) => props.theme.color.red[400]};
    &:hover {
      background: ${(props) => props.theme.color.red[400]};
      /* color: ${(props) => props.theme.mode.background[100]}; */
    }
  }
`;

export default Button;
