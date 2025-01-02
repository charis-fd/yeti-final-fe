import React, { useState, useEffect } from 'react';

const MaintenanceLogComponent = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('https://yeti-final-app.onrender.com/api/oils?populate*');
        const { data } = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Maintenance Logs</h2>
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Document ID</th>
              <th>Date</th>
              <th>Odometer</th>
              <th>Distance</th>
              <th>Oil</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.attributes.documentId}</td>
                <td>{log.attributes.date}</td>
                <td>{log.attributes.odometer}</td>
                <td>{log.attributes.distance}</td>
                <td>{log.attributes.oil}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MaintenanceLogComponent;