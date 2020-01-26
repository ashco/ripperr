import React, { useContext } from 'react';
import { FirebaseContext } from '../../context';

import { Button } from '../Buttons';

const SignOutButton: React.FC = () => {
  const firebase = useContext(FirebaseContext);

  return <Button onClick={firebase.doSignOut}>Sign Out</Button>;
};

export default SignOutButton;
