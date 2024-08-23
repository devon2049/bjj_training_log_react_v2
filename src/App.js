import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';
import TrainingLog from './components/TrainingLog';
import LogEntryForm from './components/LogEntryForm';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import About from './pages/About';
import setAuthToken from './utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [logs, setLogs] = useState([]);

  const addLog = (newLog) => {
    setLogs([...logs, newLog]);
  };

  return (
    <Router>
      <div>
        <NavBar />
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<TrainingLog logs={logs} />} />
            <Route path="/add-log" element={<LogEntryForm addLog={addLog} />} />
            <Route path="/about" element={<About />} />  {/* Added About route */}
            {/* <Route path="/training-log" element={<TrainingLog logs={logs} />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
