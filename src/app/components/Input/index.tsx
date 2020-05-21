import React from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';
import FieldWrapper from 'components/FieldWrapper';

interface Props {
  name: string;
  type: string;
  label: string;
  autoFocus?: boolean;
  register: any;
  error?: FieldError;
  disabled?: boolean;
}

const Input: React.FC<Props> = ({
  autoFocus,
  name,
  type,
  label,
  register,
  error,
  disabled,
}) => {
  return (
    <FieldWrapper disabled={disabled}>
      {/* TODO - update to use aria-describedby for error message */}
      <label htmlFor={name} role={error?.message && 'alert'}>
        {error?.message || label}
      </label>
      <input
        autoFocus={autoFocus}
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
