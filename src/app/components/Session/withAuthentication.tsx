import React, { useState, useContext, useEffect } from 'react';
import { AuthUserContext } from './index';
import { FirebaseContext } from '../Firebase';

const withAuthentication = Component => {
  const WithAuthenticationBase = props => {
    const firebase = useContext(FirebaseContext);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      });
    });

    return <Component {...props} />;
  };

  return WithAuthenticationBase;
};

export default withAuthentication;
