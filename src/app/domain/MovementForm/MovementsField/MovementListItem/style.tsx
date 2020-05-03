import styled from 'styled-components';
import ColorBarWrapper from '@/components/ColorBarWrapper';

const MovementListItemWrapper = styled.div<{ disabled: boolean }>`
  border: 2px solid
    ${(props) =>
      props.disabled
        ? props.theme.mode.color[200]
        : props.theme.mode.color[100]};
  display: grid;
  grid-template-columns: 3rem 1fr 1fr 3rem;
  cursor: default;

  p.name {
    align-self: center;
    font-size: 18px;
  }
  .number-values {
    justify-self: end;
    /* display: flex; */
    input[type='number'],
    input[type='number']:disabled {
      border: none;
      width: 5.5rem;
    }
  }
  button {
    background: none;
    color: ${(props) => props.theme.mode.color[100]};
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  button.delete-btn {
    &:hover {
      color: ${(props) => props.theme.color.red[400]};
    }
  }
  /* button.delete-btn {
    background: none;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.color.red[400]};
    }
  } */
`;

export default MovementListItemWrapper;
