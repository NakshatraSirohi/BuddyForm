import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    complaint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
    },
    message: {
        type: String,
        required: true,
        minlength: 5,
    },
    type: {
        type: String, 
        required: true,
        enum: ['status', 'upvote'],
    },
    read: {
        type: Boolean,
        default: false,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: '7d', // Automatically delete after 7 days
    }
}, { timestamps: true });

// Add an index to optimize queries on from, to, and read fields
notificationSchema.index({ from: 1, to: 1, read: 1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
