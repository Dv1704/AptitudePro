import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TestResult from '@/lib/models/TestResult';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();

        // In mongoose, find by generic 'userId' field which references ObjectId
        const results = await TestResult.find({ userId: id });

        const totalTests = results.length;
        const avgScore = totalTests > 0
            ? Math.round(results.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions * 100), 0) / totalTests)
            : 0;

        // Recent 5 (assuming sorted by date default or we explicit sort)
        // Mongoose results are not guaranteed sorted by insertion unless _id generation implies it or explicit sort.
        // Let's sort by date desc
        const history = results.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

        return NextResponse.json({
            success: true,
            stats: {
                testsTaken: totalTests,
                averageScore: avgScore
            },
            history
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Error fetching dashboard data' }, { status: 500 });
    }
}
