import express from "express";
import { submitComplaint,updateComplaint,upvoteComplaint, deleteComplaintHard,getUserComplaints, getComplaintById ,getAllComplaints } from "../controllers/complaint.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Route to submit a complaint
router.post("/create", protectRoute, submitComplaint);

router.put("/:complaintId/update", protectRoute, updateComplaint);

// Route to upvote a complaint 
router.post("/:id/upvote", protectRoute, upvoteComplaint);

// Route to delete a complaint
router.delete("/:id", protectRoute, deleteComplaintHard);

// Route to get a specific complaint of authenticated user
router.get("/your-complain", protectRoute, getUserComplaints);  

router.get("/:id", protectRoute, getComplaintById);  

//get all complaints
router.get("/", protectRoute, getAllComplaints);  



export default router;
