import React, { useState } from 'react';
import api from '../api/axios';
import { FileText, Table, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Reports = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [type, setType] = useState('pdf');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            await api.post('/reports/', { month, year, type });
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Financial Reports
                </h1>
                <p className="text-slate-400 text-lg">Generate comprehensive PDF or Excel summaries sent directly to your email.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <div className="glass p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            {type === 'pdf' ? <FileText size={120} /> : <Table size={120} />}
                        </div>

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Month</label>
                                    <select
                                        value={month}
                                        onChange={(e) => setMonth(parseInt(e.target.value))}
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-medium"
                                    >
                                        {months.map((m, i) => (
                                            <option key={m} value={i + 1}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Year</label>
                                    <input
                                        type="number"
                                        value={year}
                                        onChange={(e) => setYear(parseInt(e.target.value))}
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Report Format</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setType('pdf')}
                                        className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${type === 'pdf' ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-white/5 bg-white/5 text-slate-500'
                                            }`}
                                    >
                                        <FileText size={24} />
                                        <span className="font-bold">PDF Format</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setType('excel')}
                                        className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${type === 'excel' ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-white/5 bg-white/5 text-slate-500'
                                            }`}
                                    >
                                        <Table size={24} />
                                        <span className="font-bold">Excel (XLSX)</span>
                                    </button>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl ${type === 'pdf'
                                    ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                                    : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                                    } text-white mt-4`}
                            >
                                {loading ? <Clock className="animate-spin" /> : <Send size={20} />}
                                <span>{loading ? 'Processing...' : 'Send to my Email'}</span>
                            </button>
                        </form>
                    </div>

                    {status === 'success' && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-start gap-4 animate-fade-in">
                            <CheckCircle size={24} className="text-emerald-500 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold text-emerald-400">Request Sent!</h4>
                                <p className="text-slate-400">Your {type.toUpperCase()} report is being generated and will be sent to your email shortly.</p>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-start gap-4 animate-fade-in">
                            <AlertCircle size={24} className="text-red-500 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold text-red-500">Something went wrong</h4>
                                <p className="text-slate-400">We couldn't process your report request. Please try again later.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6 text-sm text-slate-400">
                    <div className="glass p-6 rounded-2xl">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                            <FileText size={18} className="text-indigo-400" />
                            PDF Report Includes
                        </h4>
                        <ul className="space-y-2 list-disc list-inside">
                            <li>Monthly summary dashboard</li>
                            <li>Income vs Expense cards</li>
                            <li>Detailed transaction log</li>
                            <li>Categorized spending table</li>
                        </ul>
                    </div>
                    <div className="glass p-6 rounded-2xl">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                            <Table size={18} className="text-emerald-400" />
                            Excel Report Includes
                        </h4>
                        <ul className="space-y-2 list-disc list-inside">
                            <li>Full transaction records</li>
                            <li>Filterable columns</li>
                            <li>Currency info and notes</li>
                            <li>Ready for bulk analysis</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
