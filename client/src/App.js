import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TripList from './pages/TripList'; // We'll move your current code here
import TripDetails from './pages/TripDetails';

function App() {
  return (
    <div className="App">
      <nav style={{ padding: '20px', background: '#f8f9fa', marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#333' }}>🏠 Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TripList />} />
        <Route path="/trip/:id" element={<TripDetails />} />
      </Routes>
    </div>
  );
}

export default App;