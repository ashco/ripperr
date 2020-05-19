﻿import React, { useState, useContext, useEffect } from 'react';

import AuthUserContext from './AuthUserContext';
import FirebaseContext from './FirebaseContext';

import { AuthUser } from '../types/types';

const withAuthentication = (Component: any) => {
  const WithAuthentication = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const [authUser, setAuthUser] = useState<AuthUser>(null);

    useEffect(() => {
      const unsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      });

      return (): void => unsubscribe();
    }, []);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  return WithAuthentication;
};

export default withAuthentication;
