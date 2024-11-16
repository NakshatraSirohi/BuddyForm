import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true,
        unique: true,
        match: /^2301430100\d{3}$/, // 13 digits starting with 2301430100
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
