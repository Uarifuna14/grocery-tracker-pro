import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import TripList from './pages/TripList';
import TripDetails from './pages/TripDetails';
import Reports from './pages/Reports';
import Auth from './pages/Auth';
import { LogOut } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/auth');
  };

  return (
    <div className="App" style={{ minHeight: '100vh', background: '#fafafa' }}>
      <nav style={{ padding: '15px 40px', background: '#fff', borderBottom: '1px solid #eaeaea', display: 'flex', gap: '30px', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#28a745' }}>GroceryPro</h2>
        {user ? (
          <>
            <Link to="/" style={{ textDecoration: 'none', color: '#555' }}>🏠 Trips</Link>
            <Link to="/reports" style={{ textDecoration: 'none', color: '#555' }}>📊 Reports</Link>
            <button onClick={handleLogout} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <LogOut size={18} /> Logout ({user.name})
            </button>
          </>
        ) : (
          <Link to="/auth" style={{ marginLeft: 'auto', textDecoration: 'none', color: '#28a745' }}>Login</Link>
        )}
      </nav>

      <div style={{ padding: '20px 0' }}>
        <Routes>
          <Route path="/" element={user ? <TripList /> : <Navigate to="/auth" />} />
          <Route path="/trip/:id" element={user ? <TripDetails /> : <Navigate to="/auth" />} />
          <Route path="/reports" element={user ? <Reports /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;