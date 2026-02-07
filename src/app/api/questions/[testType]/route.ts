import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Question from '@/lib/models/Question';

export async function GET(request: Request, { params }: { params: Promise<{ testType: string }> }) {
    try {
        const { testType } = await params; // Next.js 15 params are promises? Or standard. Let's assume standard await pattern for advanced Next.js

        await dbConnect();
        const questions = await Question.find({ testType });

        // Transform to match frontend expectations (options at root, etc.)
        const formatted = questions.map(q => ({
            en: q.content.en,
            sw: q.content.sw,
            // Use English options as default for display if language specific ones aren't handled by frontend logic yet
            options: q.content.en.options,
            correct: q.correctIndex
        }));

        return NextResponse.json({ success: true, questions: formatted });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Error fetching questions' }, { status: 500 });
    }
}
