import React, { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';

import FirebaseContext from 'context/FirebaseContext';
import withAuthorization from 'context/withAuthorization';

import UserList from '../features/Admin/UserList';

import { AuthUser, IUser } from '../types/types';

interface IState {
  uLoading: boolean;
  users: IUser[];
}

const INITIAL_STATE: IState = {
  uLoading: false,
  users: [],
};

const AdminPage: NextPage = () => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState(INITIAL_STATE);

  const { uLoading, users } = state;

  useEffect(() => {
    setState({ ...state, uLoading: true });

    const unsubscribe = firebase.users().onSnapshot((snapshot) => {
      const usersList: IUser[] = [];

      snapshot.forEach((doc) => {
        const { username, email } = doc.data();
        const userObj: IUser = {
          uid: doc.id,
          username,
          email,
        };

        usersList.push(userObj);
      });

      setState({
        users: usersList,
        uLoading: false,
      });
    });

    return (): void => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      {uLoading && <div>Loading ...</div>}
      <UserList users={users} />
    </div>
  );
};

const condition = (authUser: AuthUser): boolean => {
  return authUser !== null;
};

export default withAuthorization(condition)(AdminPage);
