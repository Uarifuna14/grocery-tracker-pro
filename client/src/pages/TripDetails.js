import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrips, addItem, deleteItem } from '../services/api';
import { ArrowLeft, Plus, Trash2, ShoppingCart, Tag, Hash, CreditCard } from 'lucide-react';

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', quantity: 1, category: 'Food' });

    // FIXED: Wrapped in useCallback to satisfy dependency requirements
    const loadTrip = useCallback(async () => {
        try {
            const { data } = await getTrips();
            const currentTrip = data.find(t => t._id === id);
            setTrip(currentTrip);
        } catch (error) {
            console.error("Failed to load trip details", error);
        }
    }, [id]);

    useEffect(() => {
        loadTrip();
    }, [loadTrip]);

    const handleAddItem = async (e) => {
        e.preventDefault();
        await addItem(id, formData);
        setFormData({ name: '', price: '', quantity: 1, category: 'Food' });
        loadTrip();
    };

    if (!trip) return (
        <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button onClick={() => navigate('/')} className="flex w-fit items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600">
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <div className="text-right">
                    <h2 className="text-2xl font-bold text-slate-900">{trip.storeName}</h2>
                    <p className="text-sm font-medium text-slate-500">
                        Total Value: <span className="text-lg font-bold text-emerald-600 ml-1">R{trip.totalSpent.toFixed(2)}</span>
                    </p>
                </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Add New Item</h3>
                <form onSubmit={handleAddItem} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="relative">
                        <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Item Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full rounded-xl border-slate-200 py-3 pl-10 pr-4 text-sm focus:ring-4 focus:ring-emerald-500/10 outline-none" />
                    </div>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required className="w-full rounded-xl border-slate-200 py-3 pl-10 pr-4 text-sm focus:ring-4 focus:ring-emerald-500/10 outline-none" />
                    </div>
                    <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="number" placeholder="Qty" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} required className="w-full rounded-xl border-slate-200 py-3 pl-10 pr-4 text-sm focus:ring-4 focus:ring-emerald-500/10 outline-none" />
                    </div>
                    <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full appearance-none rounded-xl border-slate-200 bg-white py-3 pl-10 pr-4 text-sm focus:ring-4 focus:ring-emerald-500/10 outline-none">
                            <option value="Food">Food</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Toiletries">Toiletries</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit" className="flex items-center justify-center rounded-xl bg-slate-900 py-3 font-bold text-white hover:bg-emerald-600 active:scale-95 shadow-lg shadow-slate-200">
                        <Plus size={20} />
                    </button>
                </form>
            </div>

            <div className="space-y-3">
                {trip.items.map(item => (
                    <div key={item._id} className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 sm:grid-cols-5 sm:px-6">
                        <div className="col-span-2">
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <span className="inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">{item.category}</span>
                        </div>
                        <div className="text-sm text-slate-500"><span className="font-semibold text-slate-900">R{item.price.toFixed(2)}</span> × {item.quantity}</div>
                        <div className="text-lg font-black text-slate-900"><span className="text-xs font-bold text-emerald-600">R</span>{(item.price * item.quantity).toFixed(2)}</div>
                        <div className="flex justify-end">
                            <button onClick={async () => { await deleteItem(id, item._id); loadTrip(); }} className="rounded-full p-2 text-slate-300 hover:bg-red-50 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripDetails;