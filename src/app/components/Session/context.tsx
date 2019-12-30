import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
// TODO Write authentication as context component, not wrapper

export interface InterfaceAuthUserContext {
  authUser: firebase.User | null;
}

const AuthUserContext = React.createContext<InterfaceAuthUserContext>({
  authUser: null,
});

export default AuthUserContext;
