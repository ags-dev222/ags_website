import express from "express";
import UserService from "../services/user.js";
import { generateToken } from "../utils/jwt.js";
import logger from "../utils/log.js";
import { authenticateWithToken, requireAuth } from "./middleware/auth.js";
import { authorizeRoles } from "../routes/middleware/auth.js";
import { requestPasswordReset, resetPassword } from "../controllers/authController.js";

const router = express.Router();

/** 
 * ✅ REGISTER A USER 
 * - No authentication required
 * - Default role: "Registered"
 */
router.post("/registerUser", async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { user, token } = await UserService.createUser({
      email,
      password,
      name,
      role: role || "Registered",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    logger.error("Registration error:", error);
    res.status(400).json({ error: error.message });
  }
});

/** 
 * ✅ LOGIN A USER 
 * - Authenticates user credentials
 * - Returns token upon successful login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { user, token } = await UserService.authenticateWithPassword(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: { email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

/** 
 * ✅ GET USER PROFILE 
 * - Requires authentication
 */
router.get("/me", authenticateWithToken, (req, res) => {
  res.status(200).json(req.user);
});

/** 
 * ✅ ADMIN-ONLY ROUTE 
 * - Requires "admin" role
 */
router.get("/adminData", authenticateWithToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const adminData = await UserService.getAdminData();
    res.status(200).json({ success: true, data: adminData });
  } catch (error) {
    logger.error("Error fetching admin data:", error);
    res.status(500).json({ error: "Unable to fetch admin data" });
  }
});

/** 
 * ✅ REGISTERED USERS ROUTE 
 * - Allows access to users with "Registered" or "admin" role
 */
router.get("/userResources", authenticateWithToken, authorizeRoles("Registered", "admin"), async (req, res) => {
  try {
    const userResources = await UserService.getUserResources();
    res.status(200).json({ success: true, data: userResources });
  } catch (error) {
    logger.error("Error fetching user resources:", error);
    res.status(500).json({ error: "Unable to fetch user resources" });
  }
});

/** 
 * ✅ LOGOUT 
 * - Destroys user session
 */
router.post("/logout", authenticateWithToken, (req, res) => {
  req.session?.destroy((err) => {
    if (err) {
      logger.error("Error during session destruction:", err);
      return res.status(500).json({ success: false, message: "Error logging out" });
    }
    res.json({ success: true, message: "Logged out successfully" });
  });
});

/** 
 * ✅ FORGOT PASSWORD 
 * - Sends password reset link/OTP via email
 */
router.post("/forgot-password", requestPasswordReset);

/** 
 * ✅ RESET PASSWORD 
 * - Verifies OTP and resets password
 */
router.post("/reset-password", resetPassword);

export default router;
