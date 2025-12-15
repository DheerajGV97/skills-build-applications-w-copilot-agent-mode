import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME ?
    `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/` :
    'http://localhost:8000/api/';
  const apiUrl = `${baseUrl}leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched leaderboard:', data);
        setEntries(data.results || data || []);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [apiUrl]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Leaderboard</h2>
        <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {(entries || []).map((entry, idx) => (
            <tr key={entry.id || idx}>
              <td>{entry.rank}</td>
              <td>{entry.user?.name || entry.user}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
