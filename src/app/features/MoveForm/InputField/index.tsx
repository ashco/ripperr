import React from 'react';
import styled from 'styled-components';
import { useField, FieldAttributes } from 'formik';

import FormError from 'components/FormError';

type IInputFieldProps = FieldAttributes<{}>;

const InputField: React.FC<IInputFieldProps> = ({
  name,
  type,
  placeholder,
}) => {
  const [field, meta] = useField(name);
  return (
    <InputFieldWrapper htmlFor={name}>
      <input {...field} name={name} type={type} placeholder={placeholder} />
      {meta.touched && meta.error && <FormError>{meta.error}</FormError>}
    </InputFieldWrapper>
  );
};

const InputFieldWrapper = styled.label`
  display: grid;
  grid-template-rows: auto 0.75rem;
  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 18px;
  }
`;

export default InputField;
