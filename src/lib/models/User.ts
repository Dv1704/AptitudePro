import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password?: string;
    role: 'student' | 'admin' | 'mentor';
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Bcrypt Hash
    role: { type: String, enum: ['student', 'admin', 'mentor'], default: 'student' },
    createdAt: { type: Date, default: Date.now }
});

// Prevent model overwrite upon HMR
const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default User;
