'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Briefcase, Users, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const isActive = (path: string) => pathname === path;
    const linkClass = (path: string) => `
        flex items-center space-x-3 px-6 py-3.5 text-slate-300 hover:bg-secondary/40 hover:text-white transition-all duration-200 border-l-4
        ${isActive(path) ? 'bg-secondary/30 text-white font-semibold border-accent' : 'border-transparent'}
    `;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-primary z-40 hidden md:flex flex-col shadow-2xl">
            <div className="p-8 border-b border-white/10 mt-2">
                <h1 className="text-2xl font-bold font-serif text-white tracking-tight">
                    Aptitude<span className="text-accent">Pro</span>
                </h1>
                <p className="text-[10px] text-slate-400 mt-1 tracking-[0.2em] uppercase font-semibold">Academic Excellence</p>
            </div>

            <nav className="flex-1 py-8 flex flex-col gap-0.5 overflow-y-auto">
                <div className="px-6 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation</div>

                <Link href="/dashboard" className={linkClass('/dashboard')}>
                    <LayoutDashboard size={18} />
                    <span className="text-sm tracking-wide">Dashboard</span>
                </Link>

                <Link href="/practice" className={linkClass('/practice')}>
                    <BookOpen size={18} />
                    <span className="text-sm tracking-wide">Practice Tests</span>
                </Link>

                <Link href="/performance" className={linkClass('/performance')}>
                    <div className="w-[18px] h-[18px] flex items-center justify-center">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor font-medium group-hover:text-white" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                    </div>
                    <span className="text-sm tracking-wide">Performance Dashboard</span>
                </Link>

                <Link href="/jobs" className={linkClass('/jobs')}>
                    <Briefcase size={18} />
                    <span className="text-sm tracking-wide">Job Board</span>
                </Link>

                <Link href="/connect" className={linkClass('/connect')}>
                    <Users size={18} />
                    <span className="text-sm tracking-wide">Connect</span>
                </Link>

                <Link href="/guidelines" className={linkClass('/guidelines')}>
                    <BookOpen size={18} strokeWidth={2} />
                    <span className="text-sm tracking-wide">Guidelines & Tips</span>
                </Link>

                <Link href="/support" className={linkClass('/support')}>
                    <HelpCircle size={18} />
                    <span className="text-sm tracking-wide">Help / Contact</span>
                </Link>

                <div className="h-px bg-white/5 mx-6 my-4"></div>

                <Link href="/admin" className={linkClass('/admin')}>
                    <div className="w-[18px] h-[18px] flex items-center justify-center">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </div>
                    <span className="text-sm tracking-wide">Admin Panel</span>
                </Link>
            </nav>

            <div className="p-6 border-t border-white/10 bg-black/10">
                <div className="flex items-center space-x-3 mb-6 px-1">
                    <div className="w-9 h-9 rounded bg-secondary/50 flex items-center justify-center text-white font-bold border border-white/10 text-xs">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{user?.name || 'Guest Academic'}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user?.email || 'guest@aptitudepro.edu'}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center space-x-2 bg-white/5 border border-white/10 text-slate-300 py-2.5 rounded hover:bg-white/10 hover:text-white transition-all text-xs font-bold tracking-wide uppercase"
                >
                    <LogOut size={14} />
                    <span>Terminate Session</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
