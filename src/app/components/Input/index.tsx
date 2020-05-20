import React from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';
import FieldWrapper from 'components/FieldWrapper';

// export const InputWrapper = styled.div<{ disabled?: boolean }>`
//   display: grid;
//   gap: 0.5rem;
//   label {
//     color: ${(p) => p.theme.mode.color[100]};
//     font-size: 14px;
//   }
//   input,
//   textarea {
//     font-size: 20px;
//     width: 100%;
//     padding: 0.5rem;
//     border: 2px solid ${(props) => props.theme.mode.color[100]};
//     /* border: none; */
//     /* border-bottom: 2px solid ${(props) => props.theme.mode.color[100]}; */
//     background: none;
//     color: ${(props) => props.theme.mode.color[100]};
//   }
//   textarea {
//     resize: none;
//     scrollbar-width: none;
//   }
//   input:disabled,
//   textarea:disabled {
//     border-bottom: none;
//   }
// `;

const Input: React.FC<{
  name: string;
  type: string;
  label: string;
  register: any;
  error?: FieldError;
  disabled?: boolean;
}> = ({ name, type, label, register, error, disabled }) => {
  return (
    <FieldWrapper disabled={disabled}>
      <label htmlFor={name} role={error?.message && 'alert'}>
        {error?.message || label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        ref={register}
        disabled={disabled}
      />
    </FieldWrapper>
  );
};

export default Input;
