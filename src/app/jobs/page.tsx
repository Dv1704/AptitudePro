'use client';

import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, Building } from 'lucide-react';

// Mock Data
const JOBS = [
    { id: 1, title: 'Junior Data Analyst', company: 'Vodacom Tanzania', location: 'Dar es Salaam', type: 'Full Time', posted: '2 days ago', salary: 'TZS 1.5M - 2M' },
    { id: 2, title: 'Tax Officer Trainee', company: 'TRA (Tanzania Revenue Authority)', location: 'Dodoma', type: 'Government', posted: '5 days ago', salary: 'TZS 1.2M' },
    { id: 3, title: 'Frontend Developer', company: 'NMB Bank', location: 'Dar es Salaam', type: 'Full Time', posted: '1 week ago', salary: 'TZS 3M+' },
    { id: 4, title: 'Legal Assistant', company: 'Mkono & Co Advocates', location: 'Arusha', type: 'Internship', posted: '3 days ago', salary: 'Stipend' },
];

export default function JobsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = JOBS.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-slate-800">Job Board</h1>
                    <p className="text-slate-500 mt-1">Explore opportunities curated for your skill level.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by role or company..."
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="space-y-4">
                {filteredJobs.map(job => (
                    <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl font-bold text-slate-400 flex-shrink-0 border border-slate-200">
                            {job.company.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row justify-between md:items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                                    <div className="flex items-center text-indigo-600 font-medium text-sm mt-1 mb-2">
                                        <Building size={16} className="mr-1.5" /> {job.company}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center"><MapPin size={14} className="mr-1" /> {job.location}</div>
                                        <div className="flex items-center"><Briefcase size={14} className="mr-1" /> {job.type}</div>
                                        <div className="flex items-center"><Clock size={14} className="mr-1" /> {job.posted}</div>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex flex-col items-end">
                                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3">{job.salary}</span>
                                    <button className="text-indigo-600 font-bold text-sm hover:underline">View Details &rarr;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
