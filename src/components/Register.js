// src/components/Register.js
import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Registration logic here (send data to /api/auth/register)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={username} onChange={handleChange} required />
      <input type="email" name="email" value={email} onChange={handleChange} required />
      <input type="password" name="password" value={password} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
