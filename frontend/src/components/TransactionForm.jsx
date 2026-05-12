import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { X, Plus, Save } from 'lucide-react';

const TransactionForm = ({ transaction, categories, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
        note: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (transaction) {
            setFormData({
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category,
                date: transaction.date,
                note: transaction.note || '',
            });
        }
    }, [transaction]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (transaction) {
                await api.put(`/transactions/${transaction.id}/`, formData);
            } else {
                await api.post('/transactions/', formData);
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to save transaction');
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = categories.filter(c => c.type === formData.type);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="glass w-full max-w-md rounded-2xl overflow-hidden animate-fade-in">
                <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-semibold">{transaction ? 'Edit' : 'Add'} Transaction</h2>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex p-1 bg-slate-900 rounded-lg border border-white/5">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'expense' })}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${formData.type === 'expense' ? 'bg-red-500/20 text-red-400 shadow-lg' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Expense
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'income' })}
                            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${formData.type === 'income' ? 'bg-emerald-500/20 text-emerald-400 shadow-lg' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Income
                        </button>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-400">Title</label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
                            placeholder="E.g. Grocery Shopping"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-400">Amount</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 focus:border-indigo-500 transition-all outline-none"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-400">Date</label>
                            <input
                                required
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 focus:border-indigo-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-400">Category</label>
                        <select
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none"
                        >
                            <option value="">Select Category</option>
                            {filteredCategories.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.icon} {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-400">Note (Optional)</label>
                        <textarea
                            rows="2"
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none resize-none"
                            placeholder="Any details..."
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Saving...' : (transaction ? <Save size={18} /> : <Plus size={18} />)}
                            <span>{transaction ? 'Update' : 'Add'} Transaction</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
