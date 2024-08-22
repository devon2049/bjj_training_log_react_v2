import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogEntryForm({ addLog }) {
  const [log, setLog] = useState({
    date: '',
    techniques: '',
    progress: '',
    goals: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog({ ...log, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logToSubmit = { ...log, date: log.date }; // Use the date as it is

    try {
      const response = await fetch('https://bjj-training-log-react-v2.onrender.com/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logToSubmit),
      });

      // Check if the response was not successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // Get the response data
      console.log('Log submitted:', result); // Log the result for debugging

      addLog(logToSubmit); // Update the log state with the new entry
      setLog({
        date: '',
        techniques: '',
        progress: '',
        goals: ''
      }); // Clear form after submission

      // Navigate to the Training Log page
      navigate('/');
    } catch (error) {
      console.error('Failed to submit log:', error); // Log the error
      alert(`Failed to submit log: ${error.message}`); // Show an alert with the error message
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Log Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={log.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="techniques" className="form-label">Techniques Practiced</label>
          <textarea
            className="form-control"
            id="techniques"
            name="techniques"
            rows="3"
            value={log.techniques}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="progress" className="form-label">Progress</label>
          <textarea
            className="form-control"
            id="progress"
            name="progress"
            rows="3"
            value={log.progress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="goals" className="form-label">Goals</label>
          <textarea
            className="form-control"
            id="goals"
            name="goals"
            rows="3"
            value={log.goals}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Log Entry</button>
      </form>
    </div>
  );
}

export default LogEntryForm;
