import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getTrips, createTrip, deleteTrip } from '../services/api';
import { Trash2, Eye, Plus, ShoppingBag } from 'lucide-react'; // FIXED: Removed unused PlusCircle

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [storeName, setStoreName] = useState('');

  const fetchTrips = useCallback(async () => {
    try {
        const { data } = await getTrips();
        setTrips(data);
    } catch (error) {
        console.error("Error fetching trips:", error);
    }
  }, []);

  useEffect(() => { fetchTrips(); }, [fetchTrips]);

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (!storeName) return;
    await createTrip({ storeName });
    setStoreName('');
    fetchTrips();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Trips</h1>
          <p className="text-slate-500 text-sm">Organize and manage your grocery spending.</p>
        </div>

        <form onSubmit={handleCreateTrip} className="flex w-full max-w-md items-center gap-2">
          <input 
            type="text" 
            placeholder="Enter Store Name (e.g. Spar)" 
            value={storeName} 
            onChange={(e) => setStoreName(e.target.value)} 
            className="w-full rounded-2xl border-slate-200 bg-slate-50 py-3 px-4 text-sm focus:ring-4 focus:ring-emerald-500/10 outline-none"
          />
          <button type="submit" className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-200">
            <Plus size={18} />
          </button>
        </form>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <div key={trip._id} className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-xl">
            <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                    <ShoppingBag size={20} />
                </div>
                <button onClick={() => deleteTrip(trip._id).then(fetchTrips)} className="text-slate-300 hover:text-red-500">
                    <Trash2 size={18} />
                </button>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-bold text-slate-900">{trip.storeName}</h3>
              <p className="text-sm font-medium text-slate-500">Total: R{trip.totalSpent.toFixed(2)}</p>
            </div>
            
            <Link to={`/trip/${trip._id}`} className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2 text-sm font-bold text-white hover:bg-emerald-600 transition-colors">
                <Eye size={16} /> View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripList;