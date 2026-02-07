import mongoose, { Schema, Model } from 'mongoose';

const QuestionSchema = new Schema({
    testType: { type: String, required: true, index: true },
    lang: { type: String, default: 'en' },
    content: {
        en: {
            q: { type: String, required: true },
            expl: { type: String },
            options: [{ type: String, required: true }]
        },
        sw: {
            q: { type: String, required: true },
            expl: { type: String },
            options: [{ type: String }]
        }
    },
    correctIndex: { type: Number, required: true }, // 0-3
    difficulty: { type: String, enum: ['foundational', 'beginner', 'intermediate', 'advanced', 'expert'], default: 'beginner' }
});

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
export default Question;
