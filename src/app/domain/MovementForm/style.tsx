import styled from 'styled-components';

const MovementFormWrapper = styled.form`
  display: grid;
  gap: 1rem;
  input,
  textarea {
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.mode.color[200]};
    /* border-bottom: 2px solid ${(props) => props.theme.mode.color[100]}; */
    background: none;
    color: ${(props) => props.theme.mode.color[100]};
  }
  input:disabled,
  textarea:disabled {
    /* border-color: ${(props) => props.theme.mode.color[200]}; */
    border-bottom: none;
  }
  input {
    font-size: 20px;
  }
  textarea {
    font-size: 20px;
    resize: none;
    scrollbar-width: none;
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
  /* Remove input arrows */
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default MovementFormWrapper;
