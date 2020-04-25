import React from 'react';
import { IUser } from '../../types/types';

const UserList: React.FC<{ users: IUser[] }> = ({ users }) => (
  <ul>
    {users.map((user: IUser) => (
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
