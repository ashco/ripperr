import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 0.5rem;
`;

export const FormWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  /* max-width: 70%; */
  h1 {
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
  input {
    font-size: 20px;
  }
  input[type='number'] {
    width: 4.5rem;
    text-align: center;
  }
  textarea {
    font-size: 1rem;
  }
  input,
  textarea {
    border: 1px solid black;
  }
  input,
  textarea,
  select {
    padding: 0.5rem;
  }
  select {
    border: none;
  }
  .error {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
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

// 0.25
// 0.5
// 0.75
// 1.0
// 1.5
// 2.0
// 3.0
// 4.0
// 6.0
