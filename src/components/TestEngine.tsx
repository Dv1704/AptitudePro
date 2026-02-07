'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from 'lucide-react';

interface Question {
    en: { q: string; expl?: string; options: string[] };
    sw: { q: string; expl?: string; options?: string[] };
    options: string[]; // Fallback/Default options
    correct: number;
}

export default function TestEngine({ testType, onExit }: { testType: string, onExit: () => void }) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(600); // 10 mins default
    const [isFinished, setIsFinished] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`/api/questions/${testType}`);
                const data = await res.json();
                if (data.success && data.questions.length > 0) {
                    setQuestions(data.questions);
                    setAnswers(new Array(data.questions.length).fill(null));
                } else {
                    // Handle empty
                    alert('No questions found for this category.');
                    onExit();
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [testType]);

    useEffect(() => {
        if (loading || isFinished) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    finishTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [loading, isFinished]);

    const handleAnswer = (optionIdx: number) => {
        const newAnswers = [...answers];
        newAnswers[currentIdx] = optionIdx;
        setAnswers(newAnswers);
    };

    const finishTest = async () => {
        setIsFinished(true);
        if (!user) return; // Don't save if guest? Or save to local?

        // Calculate result
        let correctCount = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correct) correctCount++;
        });

        const accuracy = (correctCount / questions.length) * 100;

        try {
            setSubmitting(true);
            await fetch('/api/tests/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    testType,
                    score: correctCount,
                    totalQuestions: questions.length,
                    accuracy
                })
            });
        } catch (e) {
            console.error("Failed to save", e);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Assessment...</div>;

    if (isFinished) {
        // Result View
        const correctCount = questions.reduce((acc, q, i) => (answers[i] === q.correct ? acc + 1 : acc), 0);
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Assessment Complete!</h2>
                    <p className="text-slate-500 mb-8">Your results have been saved.</p>

                    <div className="grid grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="text-3xl font-bold text-slate-800">{correctCount} / {questions.length}</div>
                            <div className="text-sm text-slate-500 uppercase font-semibold">Score</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-emerald-600">{Math.round((correctCount / questions.length) * 100)}%</div>
                            <div className="text-sm text-slate-500 uppercase font-semibold">Accuracy</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-800">{Math.floor((600 - timeLeft) / 60)}m {(600 - timeLeft) % 60}s</div>
                            <div className="text-sm text-slate-500 uppercase font-semibold">Time Taken</div>
                        </div>
                    </div>

                    <button onClick={onExit} className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700">
                        Back to Practice Center
                    </button>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentIdx];

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto h-[calc(100vh-theme(spacing.20))] flex flex-col">
            {/* Header */}
            <header className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex justify-between items-center">
                <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{testType} Assessment</span>
                    <h2 className="text-xl font-bold text-slate-800">Question {currentIdx + 1} of {questions.length}</h2>
                </div>
                <div className={`flex items-center px-4 py-2 rounded-lg font-mono font-bold ${timeLeft < 60 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-700'}`}>
                    <Clock size={18} className="mr-2" />
                    {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </div>
            </header>

            {/* Question Body */}
            <main className="flex-1 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-slate-100 flex flex-col mb-6 overflow-y-auto">
                <p className="text-xl md:text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
                    {currentQ.en.q}
                </p>

                <div className="space-y-3">
                    {currentQ.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center group ${answers[currentIdx] === i
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-medium'
                                    : 'border-slate-100 hover:border-indigo-200'
                                }`}
                        >
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 border ${answers[currentIdx] === i ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200 group-hover:border-indigo-300'}`}>
                                {String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                        </button>
                    ))}
                </div>
            </main>

            {/* Footer Nav */}
            <footer className="flex justify-between">
                <button
                    onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentIdx === 0}
                    className="flex items-center px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50"
                >
                    <ArrowLeft size={20} className="mr-2" /> Prev
                </button>

                {currentIdx < questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentIdx(prev => prev + 1)}
                        className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold"
                    >
                        Next <ArrowRight size={20} className="ml-2" />
                    </button>
                ) : (
                    <button
                        onClick={finishTest}
                        className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
                    >
                        Finish Test
                    </button>
                )}
            </footer>
        </div>
    );
}
