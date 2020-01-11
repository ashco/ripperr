import React from 'react';
import { useField, FieldAttributes } from 'formik';

type IInputFieldProps = { label: string } & FieldAttributes<{}>;

const InputField: React.FC<IInputFieldProps> = ({
  label,
  name,
  type,
  placeholder,
}) => {
  const [field, meta] = useField(name);
  return (
    <label htmlFor={name}>
      <div>{label}</div>
      <input {...field} name={name} type={type} placeholder={placeholder} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </label>
  );
};

export default InputField;
