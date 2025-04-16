import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateResetToken, generateOTP } from "../utils/password.js";
import { sendEmailNotification } from "../utils/email.js";

/**
 * ✅ Request Password Reset (Sends OTP or Reset Link)
 */
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generate OTP & Reset Token (Choose One)
    const otp = generateOTP();
    const resetToken = generateResetToken();

    // Store OTP & Reset Token in User
    user.resetToken = resetToken;
    user.otpCode = otp;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // Expires in 15 min
    await user.save();

    // Send OTP & Reset Link via Email
    const resetLink = `https://yourfrontend.com/reset-password?token=${resetToken}`;
    await sendEmailNotification(
      email,
      "Password Reset Request",
      `Use this OTP: ${otp} or click this link: ${resetLink} to reset your password.`
    );

    res.status(200).json({ message: "Password reset OTP sent to email." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. Try again." });
  }
};

/**
 * ✅ Verify OTP & Reset Password
 */
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      email,
      otpCode: otp,
      resetTokenExpiry: { $gt: Date.now() }, // Check if OTP is still valid
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    // OTP Verified, allow password reset
    res.status(200).json({ message: "OTP verified. You can reset your password." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. Try again." });
  }
};

/**
 * ✅ Reset Password (After OTP Verification or Reset Link)
 */
export const resetPassword = async (req, res) => {
  const { email, token, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
      $or: [{ resetToken: token }, { otpCode: otp }],
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token/OTP." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear OTP & Reset Token
    user.resetToken = undefined;
    user.otpCode = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong. Try again." });
  }
};
