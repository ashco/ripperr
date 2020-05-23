import React from 'react';
import { useRouter } from 'next/router';

import AuthUserContext from './AuthUserContext';
import FirebaseContext from './FirebaseContext';

const withAuthorization = (condition: any) => (Component: any) => {
  const WithAuthorization = (props: any) => {
    const firebase = React.useContext(FirebaseContext);
    const authUser = React.useContext(AuthUserContext);
    const router = useRouter();

    React.useEffect(() => {
      const unsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          router.push('/login');
        }
      });

      return (): void => unsubscribe();
    }, []);

    return condition(authUser) ? (
      <Component authUser={authUser} {...props} />
    ) : null;
  };

  return WithAuthorization;
};

export default withAuthorization;
