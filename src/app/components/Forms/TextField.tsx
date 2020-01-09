import React from 'react';
import { useField, Field, FieldAttributes } from 'formik';

type ITextFieldProps = { label: string } & FieldAttributes<{}>;

const TextField: React.FC<ITextFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <label htmlFor={props.name}>
      <div>{label}</div>
      <Field {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </label>
  );
};

export default TextField;
