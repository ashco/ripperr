import React from 'react';
import { AuthUser } from '../types';

const AuthUserContext = React.createContext<AuthUser>(null);

export default AuthUserContext;
