import React from 'react';
import FirebaseContext from 'context/FirebaseContext';

import Button from 'components/Button';

const SignOutButton: React.FC = () => {
  const firebase = React.useContext(FirebaseContext);

  return <Button onClick={firebase.doSignOut}>Sign Out</Button>;
};

export default SignOutButton;
