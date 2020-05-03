import styled from 'styled-components';

import ModalWrapper from '../ModalWrapper';

const DeleteMovementModalWrapper = styled(ModalWrapper)`
  width: 24rem;
  .text-container {
    display: grid;
    gap: 1rem;
  }
  p {
    font-size: ${(p) => p.theme.font[3]};
    .moveName {
      font-weight: 600;
    }
  }
`;

export default DeleteMovementModalWrapper;
