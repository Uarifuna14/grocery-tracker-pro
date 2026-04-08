import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrips, createTrip, deleteTrip } from '../services/api';
import { Trash2, PlusCircle, Eye } from 'lucide-react';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [storeName, setStoreName] = useState('');

  useEffect(() => { fetchTrips(); }, []);

  const fetchTrips = async () => {
    const { data } = await getTrips();
    setTrips(data);
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (!storeName) return;
    await createTrip({ storeName });
    setStoreName('');
    fetchTrips();
  };

  return (
    <div style={{ padding: '0 40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🛒 Grocery Tracker Pro</h1>
      <form onSubmit={handleCreateTrip} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input type="text" placeholder="Enter Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)} style={{ padding: '10px', flex: 1 }} />
        <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>Create Trip</button>
      </form>

      {trips.map((trip) => (
        <div key={trip._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3>{trip.storeName}</h3>
            <p>Total: R{trip.totalSpent.toFixed(2)}</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to={`/trip/${trip._id}`} style={{ color: '#007bff' }}><Eye size={24} /></Link>
            <button onClick={() => deleteTrip(trip._id).then(fetchTrips)} style={{ background: 'none', border: 'none', color: '#dc3545' }}><Trash2 size={24} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripList;