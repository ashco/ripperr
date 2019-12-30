import React, { useState, useContext, useEffect } from 'react';
import { AuthUserContext } from './index';
import { InterfaceAuthUserContext } from './context';
import { FirebaseContext } from '../Firebase';

const withAuthentication = (Component: any) => {
  const WithAuthentication = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const [authUser, setAuthUser] = useState<InterfaceAuthUserContext>({
      authUser: null,
    });

    let unsubscribe: any;

    useEffect(() => {
      unsubscribe = firebase.auth.onAuthStateChanged(authUser => {
        authUser ? setAuthUser({ authUser }) : setAuthUser({ authUser: null });
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
