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
        ref: 'Complaint', // Reference to the complaint this notification is related to
    },
    message: {
        type: String,
        required: true, // Add this if you plan to store specific notification text
        minlength: 5,  // Optional: Minimum length for message
    },
    type: {
        type: String, 
        required: true,
        enum: ['status', 'upvote'], // Notification types: status change or upvote
    },
    read: {
        type: Boolean,
        default: false, // Defaults to unread
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: '7d', // Automatically delete after 7 days
    }
}, { timestamps: true });

// Add index to optimize queries on from, to, and read fields
notificationSchema.index({ from: 1, to: 1, read: 1 });

// Ensure TTL index works for expiry
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
