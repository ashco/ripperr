import styled from 'styled-components';

import ModalWrapper from '../ModalWrapper';

import { MovementType } from '@/types/enums';

const MovementModalWrapper = styled(ModalWrapper)<{ type: MovementType }>`
  max-width: ${(props) =>
    props.type === MovementType.Workout ? '40rem' : '32rem'};
  form {
    display: grid;
    gap: 1rem;
  }
  h1.title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  input[type='number'] {
    width: 5.5rem;
    text-align: center;
  }
  input,
  textarea,
  select {
    padding: 0.5rem;
  }
  select {
    border: none;
  }
  .view-mode {
    input,
    textarea {
      background: none;
    }
  }
  .edit-mode {
  }
  .add-btn {
    width: 100%;
  }
  .add-btn,
  .rem-btn {
    font-size: 1.5rem;
    border: 1px solid black;
  }
  .missing-option {
    background: yellow;
  }
`;

export default MovementModalWrapper;
