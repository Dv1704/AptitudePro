require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env');
    process.exit(1);
}

const QuestionSchema = new mongoose.Schema({
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
    correctIndex: { type: Number, required: true },
    difficulty: { type: String, enum: ['foundational', 'beginner', 'intermediate', 'advanced', 'expert'], default: 'beginner' }
});

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

const seedQuestions = [
    {
        testType: 'aptitude',
        content: {
            en: { q: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ...?', expl: 'The pattern is n * (n+1). 1*2=2, 2*3=6, 3*4=12, 4*5=20, 5*6=30, 6*7=42.', options: ['36', '42', '40', '38'] },
            sw: { q: 'Nambari inayofuata katika mfuatano huu ni ipi: 2, 6, 12, 20, 30, ...?', expl: 'Mfumo ni n * (n+1). 1*2=2, 2*3=6, 3*4=12, 4*5=20, 5*6=30, 6*7=42.', options: ['36', '42', '40', '38'] }
        },
        correctIndex: 1
    },
    {
        testType: 'mathematics',
        content: {
            en: { q: 'Solve for x: 2x + 10 = 30', expl: '2x = 20, so x = 10.', options: ['5', '10', '15', '20'] },
            sw: { q: 'Tafuta x: 2x + 10 = 30', expl: '2x = 20, kwa hivyo x = 10.', options: ['5', '10', '15', '20'] }
        },
        correctIndex: 1
    },
    {
        testType: 'tax',
        content: {
            en: { q: 'What is the standard VAT rate in Tanzania?', expl: 'Standard VAT is 18%.', options: ['16%', '18%', '20%', '15%'] },
            sw: { q: 'Kiwango cha VAT Tanzania ni asilimia ngapi?', expl: 'VAT ya kawaida ni 18%.', options: ['16%', '18%', '20%', '15%'] }
        },
        correctIndex: 1
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await Question.deleteMany({});
        await Question.insertMany(seedQuestions);

        console.log('Successfully seeded database!');
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

seed();
