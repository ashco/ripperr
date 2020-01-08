import React from 'react';
import { useField, FormikProps, FieldProps } from 'formik';
import { string } from 'yup';

// interface Values {
//   // name: string;
//   // id: string;
//   // email: string;
//   label: string;
// }

const TextInput: React.FunctionComponent<FieldAttributes<Values>> = props => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// interface Props {
//   label: string;
// }

// type TextFieldProps = FieldProps<any> & Props;

// const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlForm={props.id || props.name}>{label}</label>
//     </>
//   );
// };

// export default TextField;
