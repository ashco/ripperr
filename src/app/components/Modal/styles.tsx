import React from 'react';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  background: ${(props) => props.theme.color.neutral[100]};
  max-width: 90vw;
  padding: 2rem;
`;
