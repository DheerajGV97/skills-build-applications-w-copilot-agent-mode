import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME ?
    `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/` :
    'http://localhost:8000/api/';
  const apiUrl = `${baseUrl}teams/`;

  useEffect(() => {
    console.log('Teams API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched teams:', data);
        setTeams(data.results || data || []);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [apiUrl]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Teams</h2>
        <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {(teams || []).map((team, idx) => (
            <tr key={team.id || idx}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.description}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
