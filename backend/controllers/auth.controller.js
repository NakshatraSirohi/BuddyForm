import User from "../models/user.model.js";
import { generateTokenSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../lib/utils/emailSender.js";

export const signup = async (req, res) => {
    try {
        const { fullName, rollNo, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate required fields
        if (!fullName || !rollNo || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate roll number format
        if (!/^2301430100\d{3}$/.test(rollNo)) {
            return res.status(400).json({ error: "Invalid roll number format" });
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check for existing roll number or email
        const existingUser = await User.findOne({ $or: [{ rollNo }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Roll number or email already exists" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new User({ fullName, rollNo, email, password: hashedPassword });
        await newUser.save();

        // Generate token and set cookie
        generateTokenSetCookie(newUser._id, res);

        // Send response with user data
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            rollNo: newUser.rollNo,
            email: newUser.email,
            createdAt: newUser.createdAt,
        });
    } catch (error) {
        
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { rollNo, password } = req.body;

        // Validate fields
        if (!rollNo || !password) {
            return res.status(400).json({ error: "Roll number and password are required" });
        }

        // Find user by roll number
        const user = await User.findOne({ rollNo });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid roll number or password" });
        }


        generateTokenSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            rollNo: user.rollNo,
            email: user.email,
            createdAt: user.createdAt,
        });
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged out successfully" });
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const getMe = async (req, res) => {
    try {
       
        const user = await User.findById(req.user._id).select("-password");
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}



export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "No user found with this email" });
        }

        // Generate a plain reset token
        const plainResetToken = `${user._id}-${Date.now()}`;
        const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // Token valid for 15 mins

        // Hash the reset token
        const hashedResetToken = await bcrypt.hash(plainResetToken, 10);

        // Save hashed token and expiry to user record
        user.resetPasswordToken = hashedResetToken;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();

        // Create reset URL with the plain token
        const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${plainResetToken}`;

        // Send email
        const subject = "Password Reset Request";
        const html = `
            <p>Hello ${user.fullName},</p>
            <p>You have requested to reset your password. Click the link below to reset it:</p>
            <a href="${resetUrl}" target="_blank">${resetUrl}</a>
            <p>This link will expire in 15 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
        `;

        await sendEmail(user.email, subject, html);

        res.status(200).json({ message: "Password reset email sent successfully." });
    } catch (error) {
        console.error("Error in forgotPassword controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ error: "Token and password are required" });
    }

    try {
        // Find the user by reset token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() }, // Ensure token is not expired
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user's password and remove reset token/expiry
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
        console.error("Error in resetPassword controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

