import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrips, addItem, deleteItem } from '../services/api';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', quantity: 1, category: 'Food' });

    useEffect(() => {
        loadTrip();
    }, [id]);

    const loadTrip = async () => {
        const { data } = await getTrips();
        const currentTrip = data.find(t => t._id === id);
        setTrip(currentTrip);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        await addItem(id, formData);
        setFormData({ name: '', price: '', quantity: 1, category: 'Food' });
        loadTrip();
    };

    if (!trip) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#007bff' }}>
                <ArrowLeft size={20} /> Back to Trips
            </button>

            <h2>{trip.storeName} Details</h2>
            <p>Total Spent: <strong>R{trip.totalSpent.toFixed(2)}</strong></p>

            {/* Add Item Form */}
            <form onSubmit={handleAddItem} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '10px', marginBottom: '30px' }}>
                <input type="text" placeholder="Item Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                <input type="number" placeholder="Qty" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} required />
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="Food">Food</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Toiletries">Toiletries</option>
                    <option value="Other">Other</option>
                </select>
                <button type="submit" style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px' }}><Plus /></button>
            </form>

            {/* Items List */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {trip.items.map(item => (
                        <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px 0' }}>{item.name}</td>
                            <td>{item.category}</td>
                            <td>R{item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>R{(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button onClick={async () => { await deleteItem(id, item._id); loadTrip(); }} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TripDetails;