import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    ArrowUpCircle,
    ArrowDownCircle,
    PieChart,
    FileText,
    ShieldCheck,
    Zap,
    MoveRight,
    TrendingUp,
    Wallet
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

const DEMO_DATA = [
    { day: 'Mon', amount: 450 },
    { day: 'Tue', amount: 200 },
    { day: 'Wed', amount: 600 },
    { day: 'Thu', amount: 350 },
    { day: 'Fri', amount: 800 },
    { day: 'Sat', amount: 500 },
    { day: 'Sun', amount: 700 },
];

const CATEGORY_DATA = [
    { name: 'Housing', value: 1200, color: '#6366f1' },
    { name: 'Food', value: 450, color: '#8b5cf6' },
    { name: 'Transport', value: 200, color: '#ec4899' },
    { name: 'Leisure', value: 300, color: '#f59e0b' },
];

export default function LandingPage() {
    const [demoTransactions, setDemoTransactions] = useState([
        { id: 1, title: 'Groceries', amount: 85.50, type: 'expense', category: 'Food', date: '2026-05-10' },
        { id: 2, title: 'Freelance Pay', amount: 1200.00, type: 'income', category: 'Salary', date: '2026-05-09' },
        { id: 3, title: 'Netflix', amount: 15.99, type: 'expense', category: 'Leisure', date: '2026-05-08' },
    ]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-xl">
                            <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            ExpenseTrack
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-sm font-medium hover:text-white transition-colors">
                            Login
                        </Link>
                        <Link to="/register" className="bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Sign Up Free
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl aspect-square bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-400 animate-fade-in">
                        <Zap className="w-3 h-3" />
                        <span>Track, Analyze, Succeed</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        Take Control of Your <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-white to-purple-400">
                            Financial Freedom.
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Visualize your spending patterns, automate your reports, and achieve your saving goals with our powerful, all-in-one expense tracking management system.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group">
                            Start Tracking Now
                            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#demo" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all">
                            View Demo
                        </a>
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-slate-900/50 border border-white/5 rounded-[40px] p-6 md:p-10 backdrop-blur-sm shadow-2xl relative">
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -z-10" />

                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Demo Dashboard */}
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <LayoutDashboard className="w-5 h-5 text-indigo-500" />
                                        Live Preview
                                    </h3>
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-xs font-bold border border-emerald-500/20">
                                            Income: $3,450
                                        </div>
                                        <div className="px-3 py-1 bg-red-500/10 text-red-500 rounded-lg text-xs font-bold border border-red-500/20">
                                            Expense: $1,280
                                        </div>
                                    </div>
                                </div>

                                <div className="h-64 bg-slate-800/20 rounded-3xl border border-white/5 p-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={DEMO_DATA}>
                                            <defs>
                                                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                            <YAxis hide />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {CATEGORY_DATA.map((cat, idx) => (
                                        <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                                            <p className="text-xs text-slate-400 mb-1">{cat.name}</p>
                                            <p className="text-lg font-bold">${cat.value}</p>
                                            <div className="h-1 w-full bg-white/5 rounded-full mt-2">
                                                <div className="h-full rounded-full transition-all duration-1000" style={{ backgroundColor: cat.color, width: '60%' }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Demo List */}
                            <div className="w-full lg:w-80 space-y-6">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">Recent Activity</h4>
                                <div className="space-y-4">
                                    {demoTransactions.map(tx => (
                                        <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/[0.08] transition-all">
                                            <div className="flex gap-4">
                                                <div className={`p-2 rounded-xl bg-opacity-20 ${tx.type === 'income' ? 'bg-emerald-500 text-emerald-500' : 'bg-red-500 text-red-500'}`}>
                                                    {tx.type === 'income' ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold group-hover:text-white transition-colors">{tx.title}</p>
                                                    <p className="text-[10px] text-slate-500 font-medium">{tx.category} • {tx.date}</p>
                                                </div>
                                            </div>
                                            <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-300'}`}>
                                                {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl text-white shadow-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase">Pro Feature</span>
                                    </div>
                                    <h5 className="text-lg font-bold leading-snug">Generate PDF reports in seconds.</h5>
                                    <p className="text-sm text-white/70 mt-2">Get monthly summaries delivered straight to your email inbox automatically.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Everything you need to <br /> <span className="text-indigo-500">master your money.</span></h2>
                        <p className="text-slate-400">Powerful features designed to simplify your financial life.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <PieChart className="w-8 h-8 text-indigo-500" />,
                                title: "Smart Visualization",
                                desc: "Dynamic charts that show you exactly where your money goes. No more guessing."
                            },
                            {
                                icon: <FileText className="w-8 h-8 text-purple-500" />,
                                title: "Automated Reporting",
                                desc: "Generate professional PDF and Excel reports with a single click. Scheduled exports included."
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
                                title: "Bank-Grade Security",
                                desc: "Your data is encrypted and protected with industry-standard JWT authentication."
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8 text-amber-500" />,
                                title: "Trend Analysis",
                                desc: "Track month-over-month growth and identify potential savings effortlessly."
                            },
                            {
                                icon: <Zap className="w-8 h-8 text-cyan-500" />,
                                title: "Blazing Fast UI",
                                desc: "Powered by React and Vite for a seamless, lag-free management experience."
                            },
                            {
                                icon: <LayoutDashboard className="w-8 h-8 text-rose-500" />,
                                title: "Custom Categories",
                                desc: "Tailor the experience to your lifestyle with deep category customization."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 bg-slate-900 border border-white/5 rounded-[32px] hover:border-indigo-500/20 transition-all group">
                                <div className="p-4 bg-white/5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold">ExpenseTrack</span>
                    </div>
                    <p className="text-slate-500 text-sm">© 2026 ExpenseTracker Inc. Built for financial freedom.</p>
                    <div className="flex gap-6">
                        <Link to="/login" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors font-medium">Terms</Link>
                        <Link to="/login" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors font-medium">Privacy</Link>
                        <Link to="/login" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors font-medium">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
