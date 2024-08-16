import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../utils/userSlice';

const UserList = () => {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
