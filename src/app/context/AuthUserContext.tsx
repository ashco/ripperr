import React from 'react';
import { IAuthUserContext } from '../types/types';

const AuthUserContext = React.createContext<IAuthUserContext>(null);

export default AuthUserContext;
