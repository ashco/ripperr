// import { FunctionComponent } from 'react';
import { InterfaceUser } from '../../pages/admin';

const UserList = ({ users }: any) => (
  <ul>
    {users.map((user: InterfaceUser) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>Email:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

export default UserList;
