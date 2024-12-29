import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function App() {
  return (
    <Router>
      
        <Routes>
          {/* Route for Login */}
          <Route path="/" element={<LoginForm />} />

          {/* Route for Signup */}
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
    
  
    </Router>
  );
}

export default App;
