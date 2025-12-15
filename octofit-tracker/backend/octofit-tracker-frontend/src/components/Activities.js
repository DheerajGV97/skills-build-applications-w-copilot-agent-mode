import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME ?
    `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/` :
    'http://localhost:8000/api/';
  const apiUrl = `${baseUrl}activities/`;

  useEffect(() => {
    console.log('Activities API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched activities:', data);
        setActivities(data.results || data || []);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
      });
  }, [apiUrl]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {(activities || []).map((activity, idx) => (
            <tr key={activity.id || idx}>
              <td>{activity.id}</td>
              <td>{activity.user?.name || activity.user}</td>
              <td>{activity.type}</td>
              <td>{activity.duration}</td>
              <td>{activity.date}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
