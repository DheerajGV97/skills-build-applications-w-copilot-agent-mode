import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME ?
    `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/` :
    'http://localhost:8000/api/';
  const apiUrl = `${baseUrl}workouts/`;

  useEffect(() => {
    console.log('Workouts API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched workouts:', data);
        setWorkouts(data.results || data || []);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [apiUrl]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Workouts</h2>
        <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {(workouts || []).map((workout, idx) => (
            <tr key={workout.id || idx}>
              <td>{workout.id}</td>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workouts;
