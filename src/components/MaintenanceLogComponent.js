import React, { useState, useEffect } from 'react';

const MaintenanceLogComponent = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('https://yeti-final-app.onrender.com/api/oils?populate*');
        const { data } = await res.json();
        setLogs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch logs');
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Maintenance Logs</h2>
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Document ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Odometer</th>
              <th className="border p-2">Distance</th>
              <th className="border p-2">Oil</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-100">
                <td className="border p-2">{log.id}</td>
                <td className="border p-2">{log.attributes.documentId}</td>
                <td className="border p-2">{log.attributes.date}</td>
                <td className="border p-2">{log.attributes.odometer}</td>
                <td className="border p-2">{log.attributes.distance}</td>
                <td className="border p-2">{log.attributes.oil}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MaintenanceLogComponent;