import React, { useState, useEffect } from 'react';
import { getCategoryStats } from '../services/api';
import { BarChart3, PieChart, TrendingUp, Package, Wallet } from 'lucide-react';

const Reports = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await getCategoryStats();
                setStats(data || []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching reports", err);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
            <p className="text-slate-500 font-medium animate-pulse">Analyzing your spending patterns...</p>
        </div>
    );

    const grandTotal = stats.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

    return (
        <div className="space-y-10">
            {/* --- HEADER --- */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                    <BarChart3 className="text-emerald-600" size={32} />
                    Spending Analytics
                </h1>
                <p className="text-slate-500 mt-2">A breakdown of your grocery expenses by category.</p>
            </div>

            {/* --- HIGHLIGHT CARD (GRAND TOTAL) --- */}
            <div className="relative overflow-hidden rounded-[2rem] bg-emerald-600 p-8 text-white shadow-xl shadow-emerald-200">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 opacity-80">
                        <Wallet size={20} />
                        <p className="text-sm font-bold uppercase tracking-widest">Total Life-Time Spending</p>
                    </div>
                    <h1 className="mt-4 text-5xl font-black">
                        <span className="text-2xl font-bold opacity-60 mr-1">R</span>
                        {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h1>
                </div>
                {/* Decorative background shape */}
                <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-emerald-500/30 blur-3xl"></div>
            </div>

            {/* --- CATEGORY GRID --- */}
            <div className="grid gap-6 md:grid-cols-2">
                {stats.length > 0 ? stats.map((stat) => {
                    const percentage = grandTotal > 0 ? (stat.totalAmount / grandTotal) * 100 : 0;
                    
                    return (
                        <div key={stat._id} className="group rounded-3xl border border-slate-100 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-lg">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                        <h3 className="text-lg font-bold text-slate-900">{stat._id}</h3>
                                    </div>
                                    <div className="mt-4 flex items-baseline gap-1">
                                        <span className="text-xs font-bold text-emerald-600">R</span>
                                        <span className="text-2xl font-black text-slate-900">{stat.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-3 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                                    <PieChart size={24} />
                                </div>
                            </div>

                            {/* Spending Bar */}
                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter">
                                    <span>Allocation</span>
                                    <span>{percentage.toFixed(1)}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                    <div 
                                        className="h-full bg-emerald-500 transition-all duration-1000" 
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 font-medium">
                                <Package size={16} />
                                <span>{stat.itemCount} individual items</span>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-300 mb-4">
                            <TrendingUp size={40} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No Data Detected</h3>
                        <p className="text-slate-500">Add items to your grocery trips to see your spending breakdown here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;