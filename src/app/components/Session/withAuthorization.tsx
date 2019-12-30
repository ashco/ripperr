import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthUserContext } from '../Session';
import { FirebaseContext } from '../Firebase';

const withAuthorization = (condition: any) => (Component: any) => {
  const WithAuthorization = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);
    const router = useRouter();

    let unsubscribe: any;

    useEffect(() => {
      unsubscribe = firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          router.push('/signin');
        }
      });

      return () => unsubscribe();
    }, []);

    return condition(authUser) ? <Component {...props} /> : null;
  };

  return WithAuthorization;
};

export default withAuthorization;
