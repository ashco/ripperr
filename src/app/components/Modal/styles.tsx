import React from 'react';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  background: ${(props) => props.theme.mode.background[300]};
  max-width: 90vw;
  padding: 2rem;
  border-radius: 5px;
  color: ${(props) => props.theme.mode.color[100]};

  input,
  textarea {
    border: 2px solid ${(props) => props.theme.mode.color[100]};
    background: none;
    color: ${(props) => props.theme.mode.color[100]};
  }
  input {
    font-size: 20px;
  }
  textarea {
    font-size: 16px;
  }
`;
