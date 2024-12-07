import { v2 as cloudinary } from 'cloudinary';
import Complaint from "../models/complaint.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import mongoose from "mongoose";

// Helper function to determine severity based on upvotes
const getSeverityFromUpvotes = (upvotes) => {
    if (upvotes > 50) return "major";
    if (upvotes > 10) return "moderate";
    return "minor"; // Default severity for 0-10 upvotes
};

export const submitComplaint = async (req, res) => {
    try {
        const { title, text, categories, file } = req.body;
        console.log("Received data by controller:", req.body);
        console.log(req.body.categories);
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized: User information missing" });
        }
        const userId = req.user._id;

        // Validate user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Invalid User to complain" });

        // // Validate inputs
        // if (!complainText) return res.status(400).json({ error: "Complaint Text is required" });
        if (!title) return res.status(400).json({ error: "Title is required" });
        if (!categories) {
            console.warn("categories is not provided; assigning default.");
        }

        // File upload
        let uploadedFile = null;
        let fileType = null;

        if (file) {
            console.log("Uploading file to Cloudinary...");
            try {
                const result = await cloudinary.uploader.upload(file, {
                    resource_type: "auto", // Handles images, videos, etc.
                });
                console.log("Cloudinary upload result:", result);
                uploadedFile = result.secure_url;
                fileType = result.resource_type;
            } catch (uploadError) {
                console.error("Cloudinary upload failed:", uploadError.message);
                return res.status(500).json({ error: "File upload failed. Please try again." });
            }
        }

        // Create the complaint
        const newComplaint = new Complaint({
            user: userId,
            title,
            complainText: text,
            categories: categories[0],
            severity: getSeverityFromUpvotes(0), // Default severity
            attachments: uploadedFile ? [{ fileUrl: uploadedFile, fileType }] : [],
        });

        await newComplaint.save();

        // Create and send notifications
        const notifyRecipients = [userId]; // Adjust logic for admins, HOD, etc.
        const notifications = notifyRecipients.map((recipient) => ({
            from: userId,
            to: recipient,
            complaint: newComplaint._id,
            message: `Complaint titled "${title}" has been submitted.`,
            type: 'status',
        }));
        await Notification.insertMany(notifications);

        // Respond to client
        res.status(201).json({
            message: "Complaint submitted successfully",
            complaint: newComplaint,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            console.error("Validation Error:", error.message);
            return res.status(400).json({ error: "Validation error: " + error.message });
        }
        console.error("Error in submitComplaint controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const updateComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { title, complainText, categories } = req.body;

        const complaint = await Complaint.findById(complaintId);
        if (!complaint || complaint.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Complaint not found or unauthorized" });
        }

        complaint.title = title || complaint.title;
        complaint.complainText = complainText || complaint.complainText;
        complaint.categories = categories || complaint.categories;

        await complaint.save();

        res.status(200).json({ message: "Complaint updated successfully", complaint });
    } catch (error) {
        console.log("Error updating complaint:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update severity based on the number of upvotes
export const updateSeverityBasedOnUpvotes = async (complaintId) => {
    try {
        const complaint = await Complaint.findById(complaintId);
        if (complaint) {
            const updatedSeverity = getSeverityFromUpvotes(complaint.upvotes.length);
            complaint.severity = updatedSeverity;
            await complaint.save();
        }
    } catch (error) {
        console.log("Error in updating severity:", error.message);
    }
};
// Upvote or remove upvote from a complaint
 
export const upvoteComplaint = async (req, res) => {
    try {
        const { id: complaintId } = req.params;  
        const userId = req.user._id; 
        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        const userHasUpvoted = complaint.upvotes.includes(userId);

        if (userHasUpvoted) {
         
            await Complaint.updateOne({ _id: complaintId }, { $pull: { upvotes: userId } });
            await updateSeverityBasedOnUpvotes(complaintId);  
            res.status(200).json({ message: "Complaint upvote removed successfully" });
        } else {
        
            complaint.upvotes.push(userId);
            await complaint.save(); 
            await updateSeverityBasedOnUpvotes(complaintId);  

 
            const upvoteNotification = new Notification({
                from: userId,
                to: complaint.user, 
                complaint: complaint._id,
                message: `Your complaint titled "${complaint.title}" has received an upvote.`,
                type: 'upvote',
            });
            await upvoteNotification.save();

            res.status(200).json({ message: "Complaint upvoted successfully" });
        }

    } catch (error) {
        console.log("Error in upvoteComplaint controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};





export const getUserComplaints = async (req, res) => {
    try {
        const userId = req.user._id;

        const userComplaints = await Complaint.find({ user: userId, isDeleted: false })
    .sort({ createdAt: -1 });

        res.status(200).json({ complaints: userComplaints });
    } catch (error) {
        console.log("Error in getUserComplaints:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ObjectId" });
        }

        const complaint = await Complaint.findById(id);

        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        res.status(200).json(complaint);
    } catch (error) {
        console.log("Error in getComplaintById controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllComplaints = async (req, res) => {
    try {
        const { title, categories, status, severity } = req.query;

        // Build the filter for complaints
        let filter = { isDeleted: false };

        if (title) filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
        if (categories) filter.categories = categories;
        if (status) filter.status = status;
        if (severity) filter.severity = severity;

        // Fetch complaints without pagination, sorted by newest first
        const complaints = await Complaint.find(filter).sort({ createdAt: -1 })

        res.status(200).json({ complaints });
    } catch (error) {
        console.log("Error in getAllComplaints controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteComplaintHard = async (req, res) => {
    try {
        

        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }
        if(complaint.user.toString() !== req.user._id.toString()){
            return res.status(404).json({error: "You are not authorised to delete this post"});
        }
        if(complaint.file){
            const fileId = complaint.file.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(fileId);
        }

        await Complaint.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Complaint deleted successfully " });

    } catch (error) {
        console.log("Error in deleteComplaintHard:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
