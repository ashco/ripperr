import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { AuthUserContext } from './index';
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

    //   componentDidMount() {
    //     this.listener = this.props.firebase.auth.onAuthStateChanged(
    //       authUser => {
    //         if (!condition(authUser)) {
    //           this.props.history.push(ROUTES.SIGN_IN);
    //         }
    //       },
    //     );
    //   }
    //   componentWillUnmount() {
    //     this.listener();
    //   }
    //   render() {
    //     return (
    //       <Component {...this.props} />
    //     );
    //   }
  };

  return WithAuthorization;
};

export default withAuthorization;
