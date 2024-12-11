import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Import the Home component
import Signup from './Signup'; // Import the Signup component
import Login from './Login'; // Import the Login component


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default route: Home page */}
          <Route path="/" element={<Home />} />
          
          {/* Other routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
