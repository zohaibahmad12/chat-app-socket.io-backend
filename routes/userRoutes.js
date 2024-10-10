import express from "express";
const router = express.Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
router.get("/signup", authMiddleware, (req, res) => {
  res.send("User signed up");
});

export default router;
