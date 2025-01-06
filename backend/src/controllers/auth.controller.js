import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import { validateEmail } from "../lib/validations.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Validation
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should contain at least 6 characters" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid Email address" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save(); // Ensure user is saved before proceeding

    // Generate JWT and respond
    generateToken(newUser._id, res);
    return res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in SignUp controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Enter a valid Email Address" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate token and respond
    generateToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in LogIn controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0}); // Modern way to clear cookies
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in Logout Functionality:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
