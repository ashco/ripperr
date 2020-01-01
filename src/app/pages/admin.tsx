import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { withAuthorization } from '../components/Session';
import { FirebaseContext } from '../components/Firebase';
import { InterfaceAuthUserContext } from '../components/Firebase/firebase';

import UserList from '../components/Admin/UserList';

export interface InterfaceUser {
  uid: string;
  email: string;
  username: string;
}

interface InterfaceState {
  loading: boolean;
  users: InterfaceUser[];
}

const INITIAL_STATE: InterfaceState = {
  loading: false,
  users: [],
};

const AdminPage: NextPage = () => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState(INITIAL_STATE);

  const { loading, users } = state;

  useEffect(() => {
    setState({ ...state, loading: true });

    const unsubscribe = firebase.users().onSnapshot(snapshot => {
      const usersList: InterfaceUser[] = [];

      snapshot.forEach(doc => {
        const { username, email } = doc.data();
        const userObj: InterfaceUser = {
          uid: doc.id,
          username,
          email,
        };

        usersList.push(userObj);
      });

      setState({
        users: usersList,
        loading: false,
      });
    });

    return (): void => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      {loading && <div>Loading ...</div>}
      <UserList users={users} />
    </div>
  );
};

const condition = (authUser: InterfaceAuthUserContext): boolean => {
  return authUser !== null;
};

export default withAuthorization(condition)(AdminPage);
