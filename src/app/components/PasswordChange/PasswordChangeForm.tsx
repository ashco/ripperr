import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';

import { InputField, passwordChangeVal } from '../Forms';
import { FirebaseContext } from '../Firebase';
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
  // const [state, setState] = useState(INITIAL_VALUES);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={passwordChangeVal}
      onSubmit={({ passwordOne, passwordTwo }, { resetForm }) => {
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
        <InputField
          label="Password"
          name="passwordOne"
          type="password"
          placeholder="Password Here"
        />
        <InputField
          label="Confirm New Password"
          name="passwordTwo"
          type="password"
          placeholder="Password Here Again"
        />
        <button>Change Password</button>
        {/* {error && <p>{error.message}</p>} */}
      </Form>
    </Formik>
  );

  // const { passwordOne, passwordTwo, error } = state;
  // const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
  //   event.preventDefault();

  //   firebase
  //     .doPasswordUpdate(passwordOne)
  //     .then(() => {
  //       setState({ ...INITIAL_STATE });
  //     })
  //     .catch((error) => {
  //       setState({ ...state, error });
  //       console.error(error);
  //     });
  // }

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       name="passwordOne"
  //       value={passwordOne}
  //       onChange={handleChange}
  //       type="password"
  //       placeholder="New Password"
  //     />
  //     <input
  //       name="passwordTwo"
  //       value={passwordTwo}
  //       onChange={handleChange}
  //       type="password"
  //       placeholder="Confirm New Password"
  //     />
  //     <button disabled={isInvalid} type="submit">
  //       Reset My Password
  //     </button>
  //     {error && <p>{error.message}</p>}
  //   </form>
  // );
};

export default PasswordChangeForm;
