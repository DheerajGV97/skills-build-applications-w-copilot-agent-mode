import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME ?
    `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/` :
    'http://localhost:8000/api/';
  const apiUrl = `${baseUrl}users/`;

  useEffect(() => {
    console.log('Users API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched users:', data);
        setUsers(data.results || data || []);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [apiUrl]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Users</h2>
        <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Team</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((user, idx) => (
            <tr key={user.id || idx}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.team?.name || user.team}</td>
              <td>{user.is_active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
