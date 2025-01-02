import React, { useState, useEffect } from 'react';

// Replace with your actual Strapi backend URL
const API_URL = process.env.REACT_APP_STRAPI_API_URL || 'https://yeti-final-app.onrender.com/api/oils?populate*';

const MaintenanceLogComponent = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceLogs = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
            // Add any additional headers like authorization if needed
            // 'Authorization': `Bearer ${your_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        
        // Set the logs state with the data from the "data" property
        setLogs(jsonData.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch maintenance logs');
        setLoading(false);
        console.error('Error fetching logs:', err);
      }
    };

    fetchMaintenanceLogs();
  }, []);

  if (loading) return <div className="p-4">Loading maintenance logs...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Vehicle Maintenance Logs</h2>
      {logs.length === 0 ? (
        <p>No maintenance logs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Document ID</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Odometer</th>
                <th className="border p-2">Distance</th>
                <th className="border p-2">Oil</th>
                <th className="border p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-100">
                  <td className="border p-2">{log.attributes.documentId}</td>
                  <td className="border p-2">{log.attributes.date}</td>
                  <td className="border p-2">{log.attributes.odometer}</td>
                  <td className="border p-2">{log.attributes.distance}</td>
                  <td className="border p-2">{log.attributes.oil}</td>
                  <td className="border p-2">{new Date(log.attributes.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MaintenanceLogComponent;