import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
    
    profileImg: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
        maxlength: 500,
    },
    link: {
        type: String,
        default: "",
    },

    // Suggested additions:
    role: {
        type: String,
        enum: ["student", "classRep", "teacher", "HOD", "Dean", "admin"],
        default: "student",
    },
    likedComplaints: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint", // Renaming 'Post' to 'Complaint' to be more specific to your app
            default: []
        }
    ],

    // To keep track of complaints submitted by the user
    complaints: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint",
            default: []
        }
    ],
    
    // To store refresh tokens if you're implementing JWT with refresh tokens
    refreshToken: {
        type: String,
        default: null,
    },
    
}, { timestamps: true });

const User = mongoose.model("User",userSchema);

export default User;
