import React from 'react';
import styled from 'styled-components';

import { sizes } from '../../styles/sizes';

export const ModalWrapper = styled.div`
  background: ${(props) => props.theme.mode.background[300]};
  max-width: 90vw;
  padding: 1rem;
  /* border-radius: 5px; */
  color: ${(props) => props.theme.mode.color[100]};
  box-shadow: ${(props) => props.theme.shadow[2]};
  /* margin: 0.5rem; */
  input,
  textarea {
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.mode.color[100]};
    background: none;
    color: ${(props) => props.theme.mode.color[100]};
  }
  input:disabled,
  textarea:disabled {
    border-color: ${(props) => props.theme.mode.color[200]};
  }
  input {
    font-size: 20px;
  }
  textarea {
    font-size: 16px;
  }
  @media (min-width: ${sizes.tablet}) {
    padding: 2rem;
  }
`;
