import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import TripList from './pages/TripList';
import TripDetails from './pages/TripDetails';
import Reports from './pages/Reports';
import Auth from './pages/Auth';
import { LogOut, ShoppingBasket, LayoutDashboard, PieChart } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/auth');
  };

  // Helper to highlight active links
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- 2026 MODERN NAV BAR --- */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
              <ShoppingBasket size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Grocery<span className="text-emerald-600">Pro</span>
            </h1>
          </div>

          {/* Navigation Links */}
          {user && (
            <div className="hidden items-center gap-8 md:flex">
              <Link 
                to="/" 
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/') ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-500'}`}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link 
                to="/reports" 
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/reports') ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-500'}`}
              >
                <PieChart size={18} /> Analytics
              </Link>
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden text-sm font-medium text-slate-400 lg:block">
                  Hi, <span className="text-slate-900">{user.name}</span>
                </span>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <Routes>
            <Route path="/" element={user ? <TripList /> : <Navigate to="/auth" />} />
            <Route path="/trip/:id" element={user ? <TripDetails /> : <Navigate to="/auth" />} />
            <Route path="/reports" element={user ? <Reports /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;