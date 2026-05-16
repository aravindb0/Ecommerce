import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
  try {
    const emailLower = email.toLowerCase();

    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hp = await bcrypt.hash(password, 10);
    const role = "user";
    const user = new User({
      email: emailLower,
      password: hp,
      role
    });
    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
  return res.status(400).json({ message: "Email and password required" });
}
  try{
const user = await User.findOne({ email: email.toLowerCase() });
    if(!user){
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  } 
});
export default router;

