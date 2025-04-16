import { generateOTP, verifyOTP } from "../services/otpService.js";

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await generateOTP(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await verifyOTP(email, otp);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
