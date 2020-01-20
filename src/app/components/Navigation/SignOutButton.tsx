import React, { useContext } from 'react';
import { FirebaseContext } from '../../context';

const SignOutButton: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  return <button onClick={firebase.doSignOut}>Sign Out</button>;
};

export default SignOutButton;
