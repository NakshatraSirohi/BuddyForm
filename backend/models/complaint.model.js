import mongoose from "mongoose";

// Define the schema for a complaint
const complaintSchema = new mongoose.Schema(
    {
        complainText: {
            type: String,
            required: true,
        },
        severity: {
            type: String,
            enum: ["minor", "moderate", "major"], // Severity levels: minor, moderate, or major
            default: "minor",
        },
        upvotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        
        status: {
            type: String,
            enum: ["pending", "resolved", "in-progress"], // Status of the complaint
            default: "pending", // Initially, complaints are pending
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Mandatory field
            index: true,
        },
        attachments: [
            {
                fileUrl: { type: String }, // URL for the uploaded file (image, video, recording)
                fileType: { type: String }, // The type of file (image, video, recording)
            },

        ],
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
