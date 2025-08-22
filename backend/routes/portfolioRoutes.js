import express from "express";
import User from "../models/Register.js"; // Import your official User model

const router = express.Router();


router.get("/", async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select('-password'); // .select('-password') excludes the password hash

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }


    res.json({
      balance: user.balance,
      portfolio: user.portfolio,
      transactions: user.transactions
    });

  } catch (err) {
    console.error("Error fetching portfolio data:", err);
    res.status(500).json({ message: "Server error while fetching portfolio." });
  }
});

export default router;
