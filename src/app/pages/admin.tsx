import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { withAuthorization } from '../components/Session';
import { FirebaseContext } from '../components/Firebase';
import { IAuthUserContext } from '../components/Firebase/firebase';

import UserList from '../components/Admin/UserList';

export interface IUser {
  uid: string;
  email: string;
  username: string;
}

interface IState {
  loading: boolean;
  users: IUser[];
}

const INITIAL_STATE: IState = {
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
      const usersList: IUser[] = [];

      snapshot.forEach(doc => {
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

const condition = (authUser: IAuthUserContext): boolean => {
  return authUser !== null;
};

export default withAuthorization(condition)(AdminPage);
