import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, User, Mail, Lock, Coins, PiggyBank } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        currency: 'INR',
        monthly_budget: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await register(formData);
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.email?.[0] || err.response?.data?.username?.[0] || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950">
            <div className="glass w-full max-w-lg p-8 rounded-3xl space-y-8 animate-fade-in shadow-2xl">
                <div className="text-center space-y-2">
                    <div className="inline-flex p-3 bg-indigo-600 rounded-2xl mb-2 shadow-lg shadow-indigo-600/20">
                        <Wallet size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Create Account</h1>
                    <p className="text-slate-400">Join ExpenseTracker to stay on top of your finances</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1 flex items-center gap-1.5">
                                <User size={14} /> Full Name
                            </label>
                            <input
                                required
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 transition-all outline-none"
                                placeholder="Ritesh Patil"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1 flex items-center gap-1.5">
                                <Mail size={14} /> Email Address
                            </label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 transition-all outline-none"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-400 ml-1 flex items-center gap-1.5">
                            <Lock size={14} /> Password
                        </label>
                        <input
                            required
                            type="password"
                            minLength="8"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 transition-all outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1 flex items-center gap-1.5">
                                <Coins size={14} /> Currency
                            </label>
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                            >
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1 flex items-center gap-1.5">
                                <PiggyBank size={14} /> Monthly Budget
                            </label>
                            <input
                                type="number"
                                value={formData.monthly_budget}
                                onChange={(e) => setFormData({ ...formData, monthly_budget: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                                placeholder="Optional"
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/30 active:scale-[0.98]"
                    >
                        {loading ? 'Creating Account...' : 'Get Started'}
                    </button>
                </form>

                <div className="text-center text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
