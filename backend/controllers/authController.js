import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateResetToken, generateOTP } from "../utils/password.js";
import { sendEmailNotification } from "../utils/email.js";
import { generateToken } from '../utils/jwt.js';
import logger from '../utils/log.js';
import rateLimit from 'express-rate-limit';
import { randomBytes } from 'crypto';

// Rate limiting for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

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
    logger.error('Password reset error:', error);
    res.status(500).json({ error: "Something went wrong. Try again." });
  }
};

/**
 * ✅ Enhanced User Registration
 */
export const registerUser = async (req, res) => {
  try {
    const { email, password, name, role = 'registered' } = req.body;
    
    // Input validation
    if (!email || !password || !name) {
      return res.status(400).json({ 
        error: 'All fields are required',
        details: { email: !email, password: !password, name: !name }
      });
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role,
      isEmailVerified: process.env.NODE_ENV === 'development' // Auto-verify in dev
    });

    await user.save();
    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      user: { 
        id: user._id,
        email: user.email, 
        name: user.name, 
        role: user.role,
        permissions: user.permissions
      },
      token
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

/**
 * ✅ Google OAuth Authentication
 */
export const googleAuth = async (req, res) => {
  try {
    const { email, name, picture, googleId } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }
    
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Create new user from Google auth
      const randomPassword = randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 12);
      
      user = new User({
        email: email.toLowerCase(),
        name,
        password: hashedPassword,
        profilePicture: picture,
        authProvider: 'google',
        googleId,
        isEmailVerified: true,
        role: 'registered'
      });
      
      await user.save();
      
      const token = generateToken(user);
      
      return res.json({
        message: 'Account created successfully with Google',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          profilePicture: user.profilePicture,
          permissions: user.permissions
        },
        token,
        isNewUser: true
      });
    }

    // Login existing user
    const token = generateToken(user);
    user.lastLoginAt = new Date();
    await user.save();

    res.json({
      message: 'Login successful with Google',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        profilePicture: user.profilePicture,
        permissions: user.permissions
      },
      token,
      isNewUser: false
    });
  } catch (error) {
    logger.error('Google auth error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
};

// Mock admin users for when database is down
const mockUsers = [
  {
    _id: '507f1f77bcf86cd799439011',
    email: 'superadmin@agsghana.org',
    password: '$2b$12$v8zBxp0kzy9vuQtWZTflx.VA0iawCvO0k64qUVOp/dsvlh.Q5BSyy', // SuperAdmin123!
    name: 'Super Administrator',
    role: 'superadmin',
    isActive: true,
    permissions: {
      canManageUsers: true,
      canManageContent: true,
      canViewAnalytics: true,
      canManageSettings: true
    },
    department: 'Administration',
    lastLoginAt: new Date()
  },
  {
    _id: '507f1f77bcf86cd799439012',
    email: 'admin@agsghana.org',
    password: '$2b$12$qj9/udqhCwndpzqD0nPsBeqRUpedxgkWgmCMITuZlc0HckkFJZApi', // Admin123!
    name: 'Administrator',
    role: 'admin',
    isActive: true,
    permissions: {
      canManageUsers: false,
      canManageContent: true,
      canViewAnalytics: true,
      canManageSettings: false
    },
    department: 'Content Management',
    lastLoginAt: new Date()
  },
  {
    _id: '507f1f77bcf86cd799439013',
    email: 'editor@agsghana.org',
    password: '$2b$12$Fp/W7gjOwz.BeXG2rpdhiOMh0gNsB/MSnltmzCeu9R15cajqXp5wm', // Editor123!
    name: 'Content Editor',
    role: 'editor',
    isActive: true,
    permissions: {
      canManageUsers: false,
      canManageContent: true,
      canViewAnalytics: false,
      canManageSettings: false
    },
    department: 'Content Management',
    lastLoginAt: new Date()
  }
];

/**
 * ✅ Enhanced Login
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe = false } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    let user;
    let isUsingMockData = false;

    try {
      // Try to find user in database first
      user = await User.findOne({ email: email.toLowerCase() });
    } catch (dbError) {
      // Database is down, use mock users
      console.warn('Database unavailable, using mock users');
      user = mockUsers.find(mockUser => mockUser.email.toLowerCase() === email.toLowerCase());
      isUsingMockData = true;
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account has been deactivated' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token with appropriate expiration
    const tokenExpiration = rememberMe ? '30d' : '1d';
    const token = generateToken(user, tokenExpiration);

    // Update last login (only if using real database)
    if (!isUsingMockData) {
      user.lastLoginAt = new Date();
      await user.save();
    } else {
      console.log(`Mock user login: ${user.email} (${user.role})`);
    }

    res.json({
      message: 'Login successful',
      user: { 
        id: user._id,
        email: user.email, 
        name: user.name, 
        role: user.role,
        permissions: user.permissions,
        profilePicture: user.profilePicture,
        department: user.department
      },
      token,
      expiresIn: tokenExpiration
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};
