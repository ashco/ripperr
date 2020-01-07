import React, { useState, useContext, useEffect } from 'react';
import { AuthUserContext } from './index';
import { IAuthUserContext } from '../Firebase/firebase';
import { FirebaseContext } from '../Firebase';

const withAuthentication = (Component: any) => {
  const WithAuthentication = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const [authUser, setAuthUser] = useState<IAuthUserContext>(null);

    let unsubscribe: any;

    useEffect(() => {
      unsubscribe = firebase.auth.onAuthStateChanged(authUser => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      });

      return () => unsubscribe();
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
