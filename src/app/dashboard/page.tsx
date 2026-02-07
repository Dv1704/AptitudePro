'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { BarChart3, Clock, Target, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
            return;
        }

        if (user) {
            fetchStats();
        }
    }, [user, isAuthenticated]);

    const fetchStats = async () => {
        try {
            const res = await fetch(`/api/user/${user!.id}/dashboard`);
            const data = await res.json();
            if (data.success) {
                setStats(data.stats);
                setHistory(data.history);
            }
        } catch (error) {
            console.error("Failed to load dashboard", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-secondary font-bold text-xs tracking-[0.3em] uppercase animate-pulse">Establishing Session...</div>
        </div>
    );

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-12">
            <header className="border-b border-slate-200 pb-8">
                <div className="text-accent font-bold text-[10px] tracking-[0.3em] uppercase mb-3">Academic Dashboard</div>
                <h1 className="text-4xl font-serif font-bold text-primary">Welcome back, {user?.name}!</h1>
                <p className="text-slate-500 mt-2 font-medium">Your personalized hub for aptitude excellence and career advancement.</p>
            </header>

            {/* Hub Cards Grid (Restored from Original) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 border border-slate-200">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Tests Taken</h3>
                    <p className="text-4xl font-serif font-bold text-primary">{stats?.testsTaken || 0}</p>
                </div>

                <div className="bg-white p-6 border border-slate-200">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Average Score</h3>
                    <p className="text-4xl font-serif font-bold text-emerald-600">{stats?.averageScore || 0}%</p>
                </div>

                <button
                    onClick={() => router.push('/practice')}
                    className="bg-white p-6 border border-slate-200 text-left hover:bg-slate-50 transition-colors group"
                >
                    <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors">Start New Test</h3>
                    <p className="text-xs text-slate-500 font-medium">Practice modules now &rarr;</p>
                </button>

                <button
                    onClick={() => router.push('/jobs')}
                    className="bg-white p-6 border border-slate-200 text-left hover:bg-slate-50 transition-colors group"
                >
                    <h3 className="text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors">Find a Job</h3>
                    <p className="text-xs text-slate-500 font-medium">View latest opportunities &rarr;</p>
                </button>
            </div>

            {/* Recent Activity (Renamed from Assessment History) */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Recent Activity</h2>
                        <p className="text-xs text-slate-500 font-medium">Chronological record of recent evaluations.</p>
                    </div>
                </div>

                <div className="border border-slate-200 bg-white overflow-hidden">
                    {history.length === 0 ? (
                        <div className="p-12 text-center text-slate-400 font-serif italic">No formal records found. Begin assessment modules to populate history.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Assessment Module</th>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Execution Date</th>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Raw Score</th>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Accuracy</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {history.map((item: any, i: number) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <Clock size={14} className="text-slate-300" />
                                                    <span className="font-bold text-primary text-sm capitalize">{item.testType.replace('-', ' ')} Assessment</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-slate-500 font-medium">{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                            <td className="px-8 py-5 text-sm font-bold text-primary text-right">{item.score} / {item.totalQuestions}</td>
                                            <td className="px-8 py-5 text-right">
                                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${item.accuracy >= 70 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                    {item.accuracy}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
