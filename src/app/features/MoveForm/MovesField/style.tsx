import styled from 'styled-components';

export const MoveListItemWrapper = styled.li<{ isDisabled: boolean }>`
  z-index: 999999;
  list-style: none;

  .list-item-container {
    height: 3rem;
    background-color: ${(props) => props.theme.mode.background[300]};
    border: 2px solid
      ${(props) =>
        props.isDisabled
          ? props.theme.mode.color[200]
          : props.theme.mode.color[100]};
    display: grid;
    grid-template-columns: 3rem 1fr 1fr 3rem;
    cursor: default;

    .drag-icon {
      display: grid;
      place-content: center;
      cursor: pointer;
      > svg {
        width: 1rem;
      }
    }
    p.name {
      align-self: center;
      font-size: 18px;
    }
    .number-values {
      /* Redeclaring here so drag will have usually inherited styles. Drag will create new element at root of body, and some styles do not copy over like they should */
      input {
        font-size: 20px;
        padding: 0.5rem;
      }
      input[type='number'] {
        width: 5.5rem;
        text-align: center;
        -moz-appearance: textfield;
      }
      /* Remove input arrows */
      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type='number'],
      input[type='number']:disabled {
        border: none;
        width: 3.5rem;
      }

      /* NEW CSS */
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));

      label {
        display: grid;
        grid-template-columns: auto 1fr;
        font-size: 14px;
        justify-self: end;
        align-items: center;
        text-align: center;
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
  }

  /* Redeclaring here so drag will have usually inherited styles. Drag will create new element at root of body, and some styles do not copy over like they should */
  color: ${(props) => props.theme.mode.color[100]};
  input {
    color: ${(props) => props.theme.mode.color[100]};
    background: none;
  }
`;

export const MoveListWrapper = styled.ul`
  display: grid;
  gap: 0.5rem;
`;
