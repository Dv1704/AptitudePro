import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TestResult from '@/lib/models/TestResult';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { userId, testType, score, totalQuestions, accuracy } = await req.json();

        const newResult = new TestResult({
            userId,
            testType,
            score,
            totalQuestions,
            accuracy
        });

        await newResult.save();
        return NextResponse.json({ success: true, message: 'Result saved' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Error saving results' }, { status: 500 });
    }
}
