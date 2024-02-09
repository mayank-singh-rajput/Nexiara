import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUser extends Document {
    name?: string;
    email: string;
    phoneNo: number;
    password: string;
    otp?: number;
    isEmailVerified?: boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phoneNo: {
            type: Number,
        },
        password: {
            type: String,
            required: true,
        },
        otp: {
            type: Number,
            default: 0,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
