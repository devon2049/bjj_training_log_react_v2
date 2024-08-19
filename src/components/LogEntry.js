import React from 'react';

function LogEntry({ log }) {
  return (
    <div className="list-group-item list-group-item-action">
      <h5 className="mb-1">Date: {log.date}</h5>
      <p className="mb-1"><strong>Techniques Practiced:</strong> {log.techniques}</p>
      <p className="mb-1"><strong>Progress:</strong> {log.progress}</p>
      <p className="mb-1"><strong>Goals:</strong> {log.goals}</p>
    </div>
  );
}

export default LogEntry;
