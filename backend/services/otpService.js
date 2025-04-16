import OTP from "../models/OTP.js";
import { sendEmail } from "../utils/email.js";
import crypto from "crypto";

export const generateOTP = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 mins

  await OTP.create({ email, otp, expiresAt });

  // Send OTP via email
  await sendEmail(email, "Your OTP Code", `Your OTP code is: ${otp}`);

  return { message: "OTP sent successfully." };
};

export const verifyOTP = async (email, otp) => {
  const otpRecord = await OTP.findOne({ email, otp });

  if (!otpRecord) throw new Error("Invalid OTP.");
  if (new Date() > otpRecord.expiresAt) throw new Error("OTP has expired.");

  await OTP.deleteOne({ email }); // Remove OTP after successful verification

  return { message: "OTP verified successfully." };
};
