import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';
import { Plus, Search, Filter, Trash2, Edit3, ChevronLeft, ChevronRight, ReceiptText } from 'lucide-react';

const Transactions = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTx, setSelectedTx] = useState(null);

    // Filters
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [txRes, catRes] = await Promise.all([
                api.get('/transactions/', {
                    params: { search, type, category, page }
                }),
                api.get('/categories/')
            ]);
            const txData = txRes.data;
            if (Array.isArray(txData)) {
                setTransactions(txData);
                setTotalPages(1);
            } else if (txData && Array.isArray(txData.results)) {
                setTransactions(txData.results);
                setTotalPages(Math.ceil((txData.count || 0) / 20));
            } else {
                setTransactions([]);
                setTotalPages(1);
            }

            const catData = catRes.data;
            if (Array.isArray(catData)) {
                setCategories(catData);
            } else if (catData && Array.isArray(catData.results)) {
                setCategories(catData.results);
            } else {
                setCategories([]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [search, type, category, page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await api.delete(`/transactions/${id}/`);
                fetchData();
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };

    const openEdit = (tx) => {
        setSelectedTx(tx);
        setShowModal(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pb-20 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <ReceiptText className="text-indigo-500" size={32} />
                        Transactions
                    </h1>
                    <p className="text-slate-400 mt-1">Manage and track your detailed spending history</p>
                </div>
                <button
                    onClick={() => { setSelectedTx(null); setShowModal(true); }}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                >
                    <Plus size={20} />
                    <span>Add Transaction</span>
                </button>
            </div>

            <div className="glass rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
                        >
                            <option value="">All Types</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => { setSearch(''); setType(''); setCategory(''); }}
                        className="flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-all"
                    >
                        <Filter size={18} /> Clear Filters
                    </button>
                </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-slate-400 text-sm font-medium uppercase tracking-wider">
                                <th className="px-6 py-4">Transaction</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">Loading transactions...</td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">No transactions found</td>
                                </tr>
                            ) : transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-white/5 transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-100">{tx.title}</div>
                                        {tx.note && <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{tx.note}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                                            style={{ backgroundColor: `${tx.category_color}20`, color: tx.category_color }}
                                        >
                                            {tx.category_name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {new Date(tx.date).toLocaleDateString()}
                                    </td>
                                    <td className={`px-6 py-4 font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {tx.type === 'income' ? '+' : '-'} {user.currency} {tx.amount}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => openEdit(tx)}
                                                className="p-2 hover:bg-slate-700 rounded-lg text-indigo-400 transition-all"
                                                title="Edit"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tx.id)}
                                                className="p-2 hover:bg-red-900/30 rounded-lg text-red-500 transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-white/5">
                    <span className="text-sm text-slate-500">
                        Page {page} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2 hover:bg-white/10 disabled:opacity-30 rounded-lg transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="p-2 hover:bg-white/10 disabled:opacity-30 rounded-lg transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <TransactionForm
                    transaction={selectedTx}
                    categories={categories}
                    onClose={() => setShowModal(false)}
                    onSuccess={fetchData}
                />
            )}
        </div>
    );
};

export default Transactions;
