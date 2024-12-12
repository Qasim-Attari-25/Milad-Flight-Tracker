import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Login.css';

// Define the loginUser function here
const loginUser = async (formValues: { email: string; password: string }) => {
  console.log('Sending payload:', formValues); // Log payload
  
  const response = await fetch('https://survayapi.themetasum.com/api/Authenticate/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValues),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error('Error details:', errorDetails); // Log error details from response
    throw new Error(`Error: ${response.status} - ${errorDetails.message || 'Unknown error'}`);
  }

  return response.json();
};



const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both email and password are required');
      setSuccess('');
      return;
    }

    try {
      const formValues = { email, password };
      const response = await loginUser(formValues);
      console.log('Login successful:', response);
      
      // Save user data to local storage (e.g., token, user details)
      localStorage.setItem('user', JSON.stringify(response));

      setSuccess('Login successful!');
      setError('');

      // Clear the form fields
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(`Login failed. ${error}`);
      setSuccess('');
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
};

export default Login;
