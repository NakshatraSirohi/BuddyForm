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
        const { title, complainText, category, file } = req.body;
        console.log("Received data:", req.body);
        const userId = req.user._id; // Assuming user ID is attached to `req.user`

        // Validate user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Invalid User to complain" });

        // Ensure all required fields are provided
        if (!complainText) return res.status(400).json({ error: "Complaint Text is required" });
        if (!title) return res.status(400).json({ error: "Title is required" });
        // if (!category) return res.status(400).json({ error: "Category is required" });

        // File upload (image/video/recording)
        let uploadedFile = null;
        let fileType = null;

        if (file) {
            try {
                const result = await cloudinary.uploader.upload(file, {
                    resource_type: "auto", // Automatically detect file type (image, video, etc.)
                });
                uploadedFile = result.secure_url; // URL of the uploaded file
                fileType = result.resource_type; // Type of the uploaded file (image, video, etc.)
            } catch (uploadError) {
                console.error("Cloudinary upload failed:", uploadError.message);
                return res.status(500).json({ error: "File upload failed" });
            }
        }

        // Create the complaint
        const newComplaint = new Complaint({
            user: userId,
            title,
            complainText,
            category,
            severity: getSeverityFromUpvotes(0), // Default severity for new complaints
            attachments: uploadedFile ? [{ fileUrl: uploadedFile, fileType }] : [],
        });

        await newComplaint.save();

        const statusNotification = new Notification({
            from: userId,
            to: userId, // This could be the admin or relevant user who needs to be notified
            complaint: newComplaint._id,
            message: `Complaint titled "${title}" has been submitted.`,
            type: 'status',
        });
        await statusNotification.save();

        res.status(201).json({
            message: "Complaint submitted successfully",
            complaint: newComplaint,
        });
    } catch (error) {
        
        console.error("Error in submitComplaint controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { title, complainText, category } = req.body;

        const complaint = await Complaint.findById(complaintId);
        if (!complaint || complaint.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Complaint not found or unauthorized" });
        }

        complaint.title = title || complaint.title;
        complaint.complainText = complainText || complaint.complainText;
        complaint.category = category || complaint.category;

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
        const { page = 1, limit = 10, title, category, status, severity } = req.query;

        let filter = { isDeleted: false };

        if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        if (category) filter.category = category;
        if (status) filter.status = status;
        if (severity) filter.severity = severity;

        const complaints = await Complaint.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalComplaints = await Complaint.countDocuments(filter);

        res.status(200).json({
            totalComplaints,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalComplaints / limit),
            complaints,

        });
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
