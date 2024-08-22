import React, { useState, useEffect } from 'react';
import LogEntry from './LogEntry';
import { Link } from 'react-router-dom';
import '../styles/TrainingLog.css';

function TrainingLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('https://bjj-training-log-react-v2.onrender.com/logs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLogs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Get the most recent log entry
  const mostRecentLog = logs[logs.length - 1];

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p>Error fetching logs: {error}</p>;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Formats the date according to the local format
  };

  return (
    <div className="container mt-4">
      <h2>Training Sessions</h2>
      <Link to="/add-log" className="btn btn-primary mb-3">Add New Log Entry</Link>

      {mostRecentLog && (
        <div className="most-recent-log mb-4">
          <h3>Most Recent Entry</h3>
          <p><strong>Date:</strong> {formatDate(mostRecentLog.date)}</p>
          <p><strong>Techniques Practiced:</strong> {mostRecentLog.techniques}</p>
          <p><strong>Progress:</strong> {mostRecentLog.progress}</p>
          <p><strong>Goals:</strong> {mostRecentLog.goals}</p>
        </div>
      )}

      {/* Render the rest of the logs */}
      {logs.slice(0, -1).map((log, index) => (
        <LogEntry key={index} log={log} />
      ))}
    </div>
  );
}

export default TrainingLog;
