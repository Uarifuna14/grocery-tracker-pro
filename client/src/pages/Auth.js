import React, { useState } from 'react';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = isLogin ? await login(formData) : await register(formData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.href = "/"; // Force refresh to update the UI state
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '12px', background: '#fff' }}>
            <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {!isLogin && (
                    <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                )}
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" style={{ padding: '12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    {isLogin ? <><LogIn size={18}/> Login</> : <><UserPlus size={18}/> Register</>}
                </button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)} style={{ textAlign: 'center', cursor: 'pointer', color: '#007bff', marginTop: '20px' }}>
                {isLogin ? "Need an account? Register" : "Have an account? Login"}
            </p>
        </div>
    );
};

export default Auth;