import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom'; 

//  registerUser function
const registerUser = async (formValues: { firstName: string; lastName: string; email: string; password: string }) => {
  console.log('Sending payload:', formValues); // Log payload
  
  const response = await fetch('https://survayapi.themetasum.com/api/Authenticate/Register', {
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

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="Signup">
      <h2>Signup</h2>
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
      <p>Already have an account? <Link to="/login">Login here</Link></p> {/* Add link to login */}
    </div>
  );
};

export default Signup;
