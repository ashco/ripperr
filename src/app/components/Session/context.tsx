import React from 'react';
import { InterfaceAuthUserContext } from '../Firebase/firebase';

const AuthUserContext = React.createContext<InterfaceAuthUserContext>({
  authUser: null,
});

export default AuthUserContext;
