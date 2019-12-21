import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext<null | Firebase>(null);

export default FirebaseContext;