import express from "express";
import { sendOTP, verifyOTPController } from "../controllers/otp.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTPController);

export default router;
