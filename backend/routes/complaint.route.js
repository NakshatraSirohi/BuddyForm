import express from "express";
import { submitComplaint,updateComplaint,getNotifications , upvoteComplaint, deleteComplaintHard, getComplaintById ,getAllComplaints } from "../controllers/complaint.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Route to submit a complaint
router.post("/create", protectRoute, submitComplaint);

router.put("/:complaintId/update", protectRoute, updateComplaint);

router.get("/notifications", protectRoute, getNotifications);

// Route to upvote a complaint (PATCH instead of POST)
router.post("/:id/upvote", protectRoute, upvoteComplaint);

// Route to delete a complaint
router.delete("/:id", protectRoute, deleteComplaintHard);

// Route to get a specific complaint by its ID
router.get("/:id", protectRoute, getComplaintById);  

//get al complaints
router.get("/", protectRoute, getAllComplaints);  



export default router;
