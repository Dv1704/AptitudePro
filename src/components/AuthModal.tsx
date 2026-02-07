'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialView = 'login' }: AuthModalProps) => {
    const [view, setView] = useState<'login' | 'register'>(initialView);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = view === 'login' ? '/api/auth/login' : '/api/auth/register';

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                login(data.user);
                onClose();
                router.push('/dashboard');
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-primary/40 backdrop-grayscale-[0.5]"
                />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="relative bg-white w-full max-w-md shadow-2xl overflow-hidden border border-slate-200"
                >
                    <div className="bg-primary p-8 text-center border-b border-white/10">
                        <h2 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">
                            {view === 'login' ? 'Log In' : 'Register'}
                        </h2>
                        <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                            {view === 'login' ? 'Authorized Personnel Only' : 'Join Our Professional Network'}
                        </p>
                    </div>

                    <div className="p-10">
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 text-xs mb-6 flex items-center">
                                <span className="font-bold mr-2 uppercase tracking-tighter italic">Error:</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {view === 'register' && (
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors font-medium text-primary"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Victor K. Mshana"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors font-medium text-primary"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors font-medium text-primary"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-4 rounded text-[10px] tracking-[0.2em] uppercase transition-all shadow-md disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : view === 'login' ? 'Log In' : 'Register'}
                            </button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                            <p className="text-slate-500 text-xs font-medium">
                                {view === 'login' ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    onClick={() => setView(view === 'login' ? 'register' : 'login')}
                                    className="ml-2 text-primary font-bold hover:underline underline-offset-4"
                                >
                                    {view === 'login' ? 'Register' : 'Log In'}
                                </button>
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
