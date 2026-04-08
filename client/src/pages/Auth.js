import React, { useState } from 'react';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User, ShoppingBasket } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = isLogin ? await login(formData) : await register(formData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            // Use navigate instead of href for a smoother 2026 experience
            window.location.href = "/"; 
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/50">
                
                {/* --- BRANDING --- */}
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                        <ShoppingBasket size={32} />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900">
                        {isLogin ? 'Welcome Back' : 'Join the Club'}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                        {isLogin ? 'Enter your details to manage your groceries.' : 'Start tracking your spending across all stores.'}
                    </p>
                </div>

                {/* --- FORM --- */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                required 
                                className="w-full rounded-2xl border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            required 
                            className="w-full rounded-2xl border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                            required 
                            className="w-full rounded-2xl border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-600 py-4 font-bold text-white transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-200 active:scale-95"
                    >
                        {isLogin ? (
                            <><LogIn size={20} className="transition-transform group-hover:-translate-x-1" /> Login</>
                        ) : (
                            <><UserPlus size={20} className="transition-transform group-hover:-translate-x-1" /> Create Account</>
                        )}
                    </button>
                </form>

                {/* --- TOGGLE --- */}
                <div className="text-center">
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700"
                    >
                        {isLogin ? "New here? Create an account" : "Already a member? Sign in instead"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;