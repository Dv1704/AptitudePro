'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    const isLandingPage = pathname === '/';

    // If explicitly on landing page, don't show sidebar
    // Or if not authenticated, we usually don't show sidebar unless we have public pages that need it.
    // For this app, sidebar is only for the "App" part.

    if (isLandingPage) {
        return <main className="min-h-screen bg-background">{children}</main>;
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 md:ml-64 transition-all duration-300">
                {children}
            </div>
        </div>
    );
}
