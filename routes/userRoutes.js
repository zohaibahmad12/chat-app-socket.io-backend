import express from "express";
const router = express.Router();
import { signup, login, auth, findUserByEmail } from "../controllers/userController.js";
import { verifyAuthToken } from "../middlewares/authMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/auth", verifyAuthToken, auth);
router.get("/find-by-email", verifyAuthToken, findUserByEmail);

export default router;
