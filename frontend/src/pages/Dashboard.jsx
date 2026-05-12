import { useEffect, useState } from 'react';
import {
    PieChart, Pie, Cell, LineChart, Line,
    XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#14B8A6'];

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function StatCard({ label, value, icon: Icon, color, sub }) {
    return (
        <div className={`glass rounded-2xl p-6 border ${color} fade-in`}>
            <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-medium text-slate-400">{label}</p>
                <div className={`p-2 rounded-xl ${color.replace('border-', 'bg-').replace('/30', '/10')}`}>
                    <Icon size={18} className={color.replace('border-', 'text-').replace('/30', '')} />
                </div>
            </div>
            <p className="text-2xl font-bold text-slate-100">{value}</p>
            {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
        </div>
    );
}

export default function Dashboard() {
    const { user } = useAuth();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const currency = user?.currency || '₹';

    const fmt = (v) => `${currency} ${Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    useEffect(() => {
        setLoading(true);
        api.get(`/transactions/summary/?month=${month}&year=${year}`)
            .then(({ data }) => setSummary(data))
            .finally(() => setLoading(false));
    }, [month, year]);

    return (
        <div className="space-y-8 fade-in">
            {/* Header + Month picker */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">Dashboard</h2>
                    <p className="text-slate-400 text-sm mt-1">
                        {MONTH_NAMES[month - 1]} {year} — financial overview
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={month}
                        onChange={e => setMonth(Number(e.target.value))}
                        className="bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-sm"
                    >
                        {MONTH_NAMES.map((m, i) => (
                            <option key={i + 1} value={i + 1}>{m}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={year}
                        onChange={e => setYear(Number(e.target.value))}
                        className="bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-sm w-24"
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="skeleton rounded-2xl h-32" />
                    ))}
                </div>
            ) : summary ? (
                <>
                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            label="Total Income"
                            value={fmt(summary.total_income)}
                            icon={TrendingUp}
                            color="border-emerald-500/30"
                        />
                        <StatCard
                            label="Total Expenses"
                            value={fmt(summary.total_expense)}
                            icon={TrendingDown}
                            color="border-red-500/30"
                        />
                        <StatCard
                            label="Net Balance"
                            value={fmt(summary.balance)}
                            icon={Wallet}
                            color={summary.balance >= 0 ? "border-indigo-500/30" : "border-orange-500/30"}
                        />
                        <StatCard
                            label="Budget Used"
                            value={summary.budget ? `${summary.budget_pct ?? 0}%` : 'No budget set'}
                            icon={Target}
                            color="border-purple-500/30"
                            sub={summary.budget ? fmt(summary.budget) + ' budget' : 'Set in profile'}
                        />
                    </div>

                    {/* Budget progress bar */}
                    {summary.budget && (
                        <div className="glass rounded-2xl p-5">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400 font-medium">Monthly Budget Progress</span>
                                <span className={`font-semibold ${summary.budget_pct > 90 ? 'text-red-400' :
                                    summary.budget_pct > 70 ? 'text-amber-400' : 'text-emerald-400'
                                    }`}>
                                    {summary.budget_pct}% used
                                </span>
                            </div>
                            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${summary.budget_pct > 90 ? 'bg-red-500' :
                                        summary.budget_pct > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                                        }`}
                                    style={{ width: `${Math.min(summary.budget_pct, 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>{fmt(summary.total_expense)} spent</span>
                                <span>{fmt(summary.budget)} total</span>
                            </div>
                        </div>
                    )}

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pie Chart */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="font-semibold text-slate-200 mb-5">Spending by Category</h3>
                            {summary.category_breakdown.length > 0 ? (
                                <ResponsiveContainer width="100%" height={260}>
                                    <PieChart>
                                        <Pie
                                            data={summary.category_breakdown}
                                            dataKey="total"
                                            nameKey="category__name"
                                            cx="50%" cy="50%"
                                            outerRadius={90}
                                            innerRadius={45}
                                            paddingAngle={3}
                                            label={({ name, percent }) =>
                                                `${name} ${(percent * 100).toFixed(0)}%`
                                            }
                                            labelLine={false}
                                        >
                                            {summary.category_breakdown.map((entry, i) => (
                                                <Cell
                                                    key={i}
                                                    fill={entry.category__color || COLORS[i % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [fmt(value), 'Amount']}
                                            contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 12 }}
                                            itemStyle={{ color: '#E2E8F0' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-64 flex items-center justify-center text-slate-500">
                                    No expenses this month
                                </div>
                            )}
                        </div>

                        {/* Line Chart */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="font-semibold text-slate-200 mb-5">Daily Income vs Expense</h3>
                            {summary.daily_trend.length > 0 ? (
                                <ResponsiveContainer width="100%" height={260}>
                                    <LineChart data={summary.daily_trend}>
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fill: '#94A3B8', fontSize: 11 }}
                                            tickFormatter={d => d.slice(8)}
                                        />
                                        <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
                                        <Tooltip
                                            formatter={(value, name) => [fmt(value), name]}
                                            contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: 12 }}
                                            itemStyle={{ color: '#E2E8F0' }}
                                        />
                                        <Legend wrapperStyle={{ color: '#94A3B8' }} />
                                        <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2.5} dot={false} name="Income" />
                                        <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2.5} dot={false} name="Expense" />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-64 flex items-center justify-center text-slate-500">
                                    No transactions this month
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category Breakdown Table */}
                    {summary.category_breakdown.length > 0 && (
                        <div className="glass rounded-2xl p-6">
                            <h3 className="font-semibold text-slate-200 mb-4">Category Breakdown</h3>
                            <div className="space-y-3">
                                {summary.category_breakdown.map((cat, i) => {
                                    const pct = Math.round((cat.total / summary.total_expense) * 100);
                                    return (
                                        <div key={i} className="flex items-center gap-3">
                                            <div
                                                className="w-3 h-3 rounded-full flex-shrink-0"
                                                style={{ background: cat.category__color || COLORS[i % COLORS.length] }}
                                            />
                                            <span className="text-sm text-slate-300 flex-1">{cat.category__name || 'Uncategorized'}</span>
                                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${pct}%`,
                                                        background: cat.category__color || COLORS[i % COLORS.length]
                                                    }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-slate-300 w-24 text-right">
                                                {fmt(cat.total)}
                                            </span>
                                            <span className="text-xs text-slate-500 w-10 text-right">{pct}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 text-slate-500">Failed to load summary</div>
            )}
        </div>
    );
}
