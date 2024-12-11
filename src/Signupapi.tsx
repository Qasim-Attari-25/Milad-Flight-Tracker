// src/Signupapi.tsx
import React, { useState } from 'react';

const Signupapi: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const registerUser = async (formValues: { firstName: string; lastName: string; email: string; password: string }) => {
    const response = await fetch('https://survayapi.themetasum.com/api/Authenticate/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required');
      setSuccess('');
      return;
    }

    try {
      const formValues = { firstName, lastName, email, password };
      const response = await registerUser(formValues);
      console.log('Registration successful:', response);
      setSuccess('Signup successful!');
      setError('');

      // Clear the form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(`Signup failed. ${error}`);
      setSuccess('');
    }
  };

  return (
    <div className="Signupapi">
      <h2>Sign Up with API</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signupapi;
