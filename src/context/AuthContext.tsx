'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check local storage or session on mount
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        // Redirect to dashboard logic is handled by the component usually, but we can do it here
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
