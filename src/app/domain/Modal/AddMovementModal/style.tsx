import styled from 'styled-components';

import ModalWrapper from '../ModalWrapper';

const AddSelectModalWrapper = styled(ModalWrapper)`
  width: 24rem;
  gap: 0.5rem;
  .btn-container {
    display: grid;
    gap: 0.5rem;
  }
  .cancel-btn {
    margin-top: 2rem;
  }
`;

export default AddSelectModalWrapper;
