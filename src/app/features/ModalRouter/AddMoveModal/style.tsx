import styled from 'styled-components';
import Container from 'components/Container';

const AddMoveModalContainer = styled(Container)`
  width: 24rem;

  .content {
    width: 100%;
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

export default AddMoveModalContainer;
