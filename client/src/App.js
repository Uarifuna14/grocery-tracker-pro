import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TripList from './pages/TripList';
import TripDetails from './pages/TripDetails';
import Reports from './pages/Reports';

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Navigation Bar */}
      <nav style={{ 
        padding: '15px 40px', 
        background: '#ffffff', 
        borderBottom: '1px solid #eaeaea', 
        display: 'flex', 
        gap: '30px',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#28a745' }}>GroceryPro</h2>
        <Link to="/" style={{ textDecoration: 'none', color: '#555', fontWeight: '500' }}>🏠 Trips</Link>
        <Link to="/reports" style={{ textDecoration: 'none', color: '#555', fontWeight: '500' }}>📊 Reports</Link>
      </nav>

      {/* Main Content Area */}
      <div style={{ padding: '20px 0' }}>
        <Routes>
          <Route path="/" element={<TripList />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;