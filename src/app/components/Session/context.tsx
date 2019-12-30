import React from 'react';
import { InterfaceAuthUserContext } from '../Firebase/firebase';

const AuthUserContext = React.createContext<InterfaceAuthUserContext>(null);

export default AuthUserContext;
