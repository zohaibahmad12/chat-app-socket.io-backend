import express from "express";
const router = express.Router();
import { signup, login, auth } from "../controllers/userController.js";
import { verifyAuthToken } from "../middlewares/authMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/auth", verifyAuthToken, auth);

export default router;
