import React from 'react';
import { IAuthUserContext } from '../Firebase/firebase';

const AuthUserContext = React.createContext<IAuthUserContext>(null);

export default AuthUserContext;
