import React from 'react';
import { IAuthUserContext } from '../common/types';

const AuthUserContext = React.createContext<IAuthUserContext>(null);

export default AuthUserContext;
