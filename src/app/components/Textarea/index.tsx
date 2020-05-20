import React from 'react';
import styled from 'styled-components';
import { FieldError, Controller, Control } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

import FieldWrapper from 'components/FieldWrapper';

interface Props {
  name: string;
  label?: string;
  control: Control;
  error?: FieldError;
  maxRows: number;
  disabled?: boolean;
}

const Textarea: React.FC<Props> = ({
  name,
  label,
  error,
  maxRows,
  control,
  disabled,
}) => {
  return (
    <FieldWrapper>
      <label htmlFor={name} role={error?.message && 'alert'}>
        {error?.message || label}
      </label>
      <Controller
        as={<TextareaAutosize maxRows={maxRows} />}
        name={name}
        control={control}
        disabled={disabled}
      />
    </FieldWrapper>
  );
};

export default Textarea;
