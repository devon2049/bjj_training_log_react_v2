import React from 'react';
import LogEntry from './LogEntry';
import { Link } from 'react-router-dom';
import '../styles/TrainingLog.css';

function TrainingLog({ logs }) {
  // Get the most recent log entry
  const mostRecentLog = logs[logs.length - 1];

  return (
    <div className="container mt-4">
      <h2>Training Sessions</h2>
      <Link to="/add-log" className="btn btn-primary mb-3">Add New Log Entry</Link>

      {mostRecentLog && (
        <div className="most-recent-log mb-4">
          <h3>Most Recent Entry</h3>
          <p><strong>Date:</strong> {mostRecentLog.date}</p>
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
