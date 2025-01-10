import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import { validateEmail } from "../lib/validations.js";
import nodemailer from "nodemailer";

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
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    //Get users email and validate it , then find user if the user exists then generate a random 6 digit otp and hash it and store it in the user model 
    if(!validateEmail(email)){
      return res.status(400).json({ message: "Enter a valid Email Address" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const saltRounds = 10
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    user.resetPasswordOTP = hashedOTP;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    //send the otp to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
      }
    });
    //send the otp to the user's email
    try{
      await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP is ${otp} , OTP is valid for 15 minutes`
      });
      res.status(200).json({ message: "OTP has been sent to your email" });
    }catch(error){
      console.log("Error in sending email", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }

  } catch (error) {
    console.error("Error in forgotPassword controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if(!user.resetPasswordOTP || !user.resetPasswordExpires){
      return res.status(400).json({ message: "OTP not found" });
    }
    if(user.resetPasswordExpires < new Date()){
      return res.status(400).json({ message: "OTP has expired" });
    }
    //If the user exists then compare the otp with the hashed otp in the user model
    const isMatch = await bcrypt.compare(otp, user.resetPasswordOTP);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOTP controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
