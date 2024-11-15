import User from "../models/user.model.js";
import { generateTokenSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password, role } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate required fields
        // if (!fullName || !username || !email || !password) {
        //     return res.status(400).json({ error: "All fields are required" });
        // }

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check for existing username
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        // Check for existing email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Set default role as 'student' if no role is provided
        const userRole = role || "student";

        // Create a new user with the specified or default role
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            role: userRole, // Setting role in the user schema
        });

        // Save the new user and set cookie token
        await newUser.save();
        generateTokenSetCookie(newUser._id, res);

        // Send response with user data
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
            bio: newUser.bio,
            link: newUser.link,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        });

    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try{
         const {username,password}=req.body;
         const user = await User.findOne({username});
         const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
 
         if(!user || !isPasswordCorrect){
             return res.status(400).json({error:"Invalid username or password"})
         }
 
         generateTokenSetCookie(user._id,res);
 
         res.status(200).json({
             _id: user._id,
             fullName: user.fullName,
            email: user.email,
            role: user.role,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
            bio: user.bio,
            link: user.link,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
         })
 
    }catch (error) {
         console.log("Error in login controller", error.message);
         res.status(500).json({ error: "Internal server error" });
     }
 }
 

 export const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged out successfully" });
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMe = async (req,res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    }catch(error){
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}