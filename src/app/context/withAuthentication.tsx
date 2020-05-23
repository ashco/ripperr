import React from 'react';

import AuthUserContext from './AuthUserContext';
import FirebaseContext from './FirebaseContext';

import { AuthUser } from '../types';

const withAuthentication = (Component: any) => {
  const WithAuthentication = (props: any) => {
    const firebase = React.useContext(FirebaseContext);
    const [authUser, setAuthUser] = React.useState<AuthUser>(null);

    React.useEffect(() => {
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
