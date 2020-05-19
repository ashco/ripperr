import React from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

const InputWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
  label {
    color: ${(p) => p.theme.mode.color[100]};
  }
  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 18px;
    border: 2px solid ${(props) => props.theme.mode.color[100]};
    background: none;
    color: ${(props) => props.theme.mode.color[100]};
  }
`;

const Input: React.FC<{
  name: string;
  type: string;
  label: string;
  register: any;
  error?: FieldError;
}> = ({ name, type, label, register, error }) => {
  return (
    <InputWrapper>
      <label htmlFor={name} role={error?.message && 'alert'}>
        {error?.message || label}
      </label>
      <input id={name} type={type} name={name} ref={register} />
    </InputWrapper>
  );
};

export default Input;
