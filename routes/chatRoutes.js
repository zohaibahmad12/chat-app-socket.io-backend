import express from "express";
const router = express.Router();
import { verifyAuthToken } from "../middlewares/authMiddleware.js";
import { getChat, addMessage } from "../controllers/chatController.js";

router.get("/get-chat", verifyAuthToken, getChat);
router.post("/add-message", verifyAuthToken, addMessage);

export default router;
