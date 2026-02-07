'use client';

import React, { useState } from 'react';
import { BookOpen, Calculator, Brain, Scale, DollarSign, Code } from 'lucide-react';
import TestEngine from '@/components/TestEngine';

// Mock Categories for UI (since these are hardcoded in the original too)
const CATEGORIES = [
    { id: 'aptitude', title: 'Aptitude & Logic', icon: Brain, color: 'indigo', desc: 'Abstract reasoning and pattern recognition.' },
    { id: 'mathematics', title: 'Mathematics', icon: Calculator, color: 'emerald', desc: 'Numerical analysis and problem solving.' },
    { id: 'english', title: 'English Proficiency', icon: BookOpen, color: 'sky', desc: 'Verbal reasoning and comprehension.' },
    { id: 'law', title: 'Law & Governance', icon: Scale, color: 'slate', desc: 'Legal principles and constitution.' },
    { id: 'tax', title: 'Tax & Revenue', icon: DollarSign, color: 'amber', desc: 'Taxation laws and calculations.' },
    { id: 'ict', title: 'ICT & Tech', icon: Code, color: 'purple', desc: 'Computer science and digital skills.' },
];

export default function PracticePage() {
    const [activeTest, setActiveTest] = useState<string | null>(null);

    if (activeTest) {
        return <TestEngine testType={activeTest} onExit={() => setActiveTest(null)} />;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-slate-800">Practice Center</h1>
                <p className="text-slate-500 mt-1">Select a category to begin your assessment.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTest(cat.id)}
                        className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-${cat.color}-200 transition-all text-left flex flex-col group`}
                    >
                        <div className={`w-12 h-12 rounded-lg bg-${cat.color}-50 text-${cat.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <cat.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{cat.title}</h3>
                        <p className="text-sm text-slate-500">{cat.desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
