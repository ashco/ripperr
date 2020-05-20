import styled from 'styled-components';

const FieldWrapper = styled.div<{ disabled?: boolean }>`
  display: grid;
  gap: 0.5rem;
  label {
    color: ${(p) => p.theme.mode.color[100]};
    font-size: 14px;
  }
  input,
  textarea {
    font-size: 20px;
    width: 100%;
    padding: 0.5rem;
    border: 2px solid ${(props) => props.theme.mode.color[100]};
    /* border: none; */
    /* border-bottom: 2px solid ${(props) => props.theme.mode.color[100]}; */
    background: none;
    color: ${(props) => props.theme.mode.color[100]};
  }
  textarea {
    resize: none;
    scrollbar-width: none;
  }
  input:disabled,
  textarea:disabled {
    /* border-bottom: none; */
    border-color: gray;
  }
`;

export default FieldWrapper;
