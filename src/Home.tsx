import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const FLIGHT_TRACKER_API_KEY = '1567b39840d7504dd314004b4a94460c';
const API_URL = 'https://api.aviationstack.com/v1/flights';

const FlightTracker: React.FC = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightData, setFlightData] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchFlightData = async (flight: string) => {
    if (!flight) {
      setError('Please enter a flight number.');
      return;
    }

    setError('');
    setFlightData(null);

    try {
      const response = await fetch(
        `${API_URL}?access_key=${FLIGHT_TRACKER_API_KEY}&flight_iata=${flight}`
      );

      if (!response.ok) {
        throw new Error('Unable to fetch flight data. Please check the flight number.');
      }

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const flightInfo = data.data[0]; // Only use the first flight result
        setFlightData(flightInfo);
      } else {
        throw new Error('No flight data available.');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong while fetching the data.');
    }
  };

  return (
    <div className="FlightTracker">
      {/* Navbar Section */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>T
      </nav>

      <header className="header">
        <h1>Milad Flight Tracker</h1>
        <p>Track flights in real-time with ease.</p>
      </header>

      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter flight number (e.g., AA123)"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
        <button onClick={() => fetchFlightData(flightNumber)}>Track Flight</button>
      </div>

      {/* Error Display */}
      {error && <div className="error">{error}</div>}

      {/* Flight Information */}
      {flightData && (
        <div className="flight-info">
          <h2>Flight Information</h2>
          <p><strong>Flight:</strong> {flightData.flight?.iata || 'N/A'}</p>
          <p><strong>Airline:</strong> {flightData.airline?.name || 'N/A'}</p>
          <p><strong>Status:</strong> {flightData.flight_status || 'N/A'}</p>
          <p>
            <strong>Departure:</strong> {flightData.departure?.airport || 'N/A'} 
            ({flightData.departure?.scheduled || 'N/A'})
          </p>
          <p>
            <strong>Arrival:</strong> {flightData.arrival?.airport || 'N/A'} 
            ({flightData.arrival?.scheduled || 'N/A'})
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>Contact us: <a href="mailto:flighttracker@example.com" className="email">miladflighttracker@gmail.com</a></p>
        <p>&copy; 2024 Flight Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FlightTracker;
