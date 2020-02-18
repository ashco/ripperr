﻿import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthUserContext, FirebaseContext } from './index';

const withAuthorization = (condition: any) => (Component: any) => {
  const WithAuthorization = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          router.push('/signin');
        }
      });

      return () => unsubscribe();
    }, []);

    return condition(authUser) ? (
      <Component authUser={authUser} {...props} />
    ) : null;
  };

  return WithAuthorization;
};

export default withAuthorization;
