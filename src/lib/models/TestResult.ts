import mongoose, { Schema, Model } from 'mongoose';

const TestResultSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    testType: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    accuracy: { type: Number },
    date: { type: Date, default: Date.now }
});

const TestResult = mongoose.models.TestResult || mongoose.model('TestResult', TestResultSchema);
export default TestResult;
