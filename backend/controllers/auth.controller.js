import User from "../models/user.model.js";
import { generateTokenSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs";

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

        // Generate token and set cookie
        generateTokenSetCookie(user._id, res);

        // Respond with user data
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
        // Find the user by their unique _id (which is guaranteed to be unique)
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
