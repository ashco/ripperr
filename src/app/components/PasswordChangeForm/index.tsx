import React, { useContext } from 'react';
import { Formik, Form } from 'formik';

import InputField from '../../domain/MovementForm/InputField';
import { passwordChangeVal } from '../../domain/MovementForm/validationSchema';
import Button from 'components/Button';
import { FirebaseContext } from '../../context';
// import { IError } from '../Signup/SignUpForm';

interface IPasswordChangeForm {
  passwordOne: string;
  passwordTwo: string;
  // error: null | IError;
}

const INITIAL_VALUES: IPasswordChangeForm = {
  passwordOne: '',
  passwordTwo: '',
  // error: null,
};

const PasswordChangeForm: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={passwordChangeVal}
      onSubmit={({ passwordOne }, { resetForm }) => {
        firebase
          .doPasswordUpdate(passwordOne)
          .then(() => {
            resetForm();
          })
          .catch((error) => {
            // TODO - Handle error message
            // setState({ ...state, error });
            console.error(error);
          });
      }}
    >
      <Form>
        <InputField name="passwordOne" type="password" placeholder="Password" />
        <InputField
          name="passwordTwo"
          type="password"
          placeholder="Confirm Password"
        />
        <Button type="submit">Change Password</Button>
        {/* {error && <p>{error.message}</p>} */}
      </Form>
    </Formik>
  );
};

export default PasswordChangeForm;
