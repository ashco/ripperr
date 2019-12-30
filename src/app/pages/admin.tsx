import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { FirebaseContext } from '../components/Firebase';

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

    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      if (usersObject === null) return;

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      setState({
        users: usersList,
        loading: false,
      });
    });

    return (): void => firebase.users().off();
  }, [users]);

  return (
    <div>
      <h1>Admin Page</h1>
      {loading && <div>Loading ...</div>}
      <UserList users={users} />
    </div>
  );
};

export default AdminPage;
