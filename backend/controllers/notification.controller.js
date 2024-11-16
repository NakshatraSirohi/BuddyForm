import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id; // Get the logged-in user's ID from the request

        // Fetch notifications for the user and populate relevant fields
        const notifications = await Notification.find({ to: userId })
            .populate('from', 'name email')  // Populate the sender's details (user who triggered the notification)
            .populate('complaint', 'title status')  // Populate the complaint details (title and status)
            .exec();

        // If no notifications, return an empty array
        if (!notifications.length) {
            return res.status(200).json({ message: "No notifications available" });
        }

        res.status(200).json(notifications);  // Send the populated notifications
    } catch (error) {
        console.log("Error in getting notifications:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteNotifications = async (req,res) => {
    try{
        const userId = req.user._id;

        await Notification.deleteMany({to:userId});

        res.status(200).json({message: "deleted notifications successfully"});

    }catch(error){
        console.log("Error in deleteNotifications controller", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}