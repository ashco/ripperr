import styled from 'styled-components';
import ModalContainer from 'domain/Modal/ModalContainer';

const NewMovementMenuContainer = styled(ModalContainer)`
  .content {
    gap: 0.5rem;
    .btn-container {
      display: grid;
      gap: 0.5rem;
    }
    .cancel-btn {
      margin-top: 2rem;
    }
  }
`;

export default NewMovementMenuContainer;
