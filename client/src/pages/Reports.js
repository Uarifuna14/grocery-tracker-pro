import React, { useState, useEffect } from 'react';
import { getCategoryStats } from '../services/api';
import { BarChart3, PieChart, IndianRupee, DollarSign } from 'lucide-react';

const Reports = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await getCategoryStats();
                setStats(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching reports", err);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Analyzing your spending...</p>;

    const grandTotal = stats.reduce((acc, curr) => acc + curr.totalAmount, 0);

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BarChart3 color="#28a745" /> Spending Analytics
            </h2>

            {/* Summary Card */}
            <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '12px', border: '1px solid #bbf7d0', marginBottom: '30px' }}>
                <p style={{ margin: 0, color: '#166534', fontSize: '1.1rem' }}>Total Life-Time Spending</p>
                <h1 style={{ margin: '5px 0', color: '#14532d' }}>${grandTotal.toFixed(2)}</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {stats.length > 0 ? stats.map((stat) => (
                    <div key={stat._id} style={{ border: '1px solid #eee', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                {stat._id}
                            </span>
                            <PieChart size={18} color="#94a3b8" />
                        </div>
                        <h2 style={{ margin: '15px 0 5px 0' }}>${stat.totalAmount.toFixed(2)}</h2>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{stat.itemCount} items purchased</p>
                        
                        {/* Simple Progress Bar for Visuals */}
                        <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '10px', marginTop: '15px', overflow: 'hidden' }}>
                            <div style={{ 
                                width: `${(stat.totalAmount / grandTotal) * 100}%`, 
                                height: '100%', 
                                background: '#22c55e' 
                            }}></div>
                        </div>
                    </div>
                )) : (
                    <p>No data available yet. Add some items to your trips!</p>
                )}
            </div>
        </div>
    );
};

export default Reports;