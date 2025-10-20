/**
 * 1. register a user without authentication
 * 2. login a user with auth
 * 3. get a user profile with auth
 * 4. admin only access route with auth
 * 5. registered user access route with auth
 * 6. logout user with auth 
 */

import express from 'express';
import UserService from '../services/user.js';
import logger from '../utils/log.js';
import { generateToken, verifyToken } from '../utils/jwt.js';
import { authenticateWithToken, requireAuth } from './middleware/auth.js';
import { authorizeRoles } from '../routes/middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *         role:
 *           type: string
 *           enum: [admin, Registered]
 *           description: User role (admin or registered user)
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the last login
 *         isActive:
 *           type: boolean
 *           description: Indicates if the account is active
 *         failedLoginAttempts:
 *           type: integer
 *           description: Number of failed login attempts
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Login successful
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *         user:
 *           $ref: '#/components/schemas/User'
 *
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /api/auth/registerUser:
 *   post:
 *     summary: Register a new user (No authentication required)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mysecurepassword
 *               role:
 *                 type: string
 *                 enum: [Registered, admin]
 *                 example: Registered
 *               lastLogin:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-01-01T00:00:00Z
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               failedLoginAttempts:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Missing required fields
 */

// Register Route (No Authentication Required)
router.post('/registerUser', async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Set the default role to 'Registered' if no role is specified
  const userRole = role || 'Registered';  // 'Registered' is default, can be changed based on your logic

  try {
    const { user, token } = await UserService.createUser({
      email,
      password,
      name,
      role: userRole,  // Use the role provided by the user or default
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mysecurepassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 */

// Login Route 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { user, token } = await UserService.authenticateWithPassword(email, password);
    const refreshToken = generateToken({ id: user.id }, 'refreshSecret'); // Generate refresh token

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return the user with the role and the token
    res.json({
      message: 'Login successful',
      user: { email: user.email, name: user.name, role: user.role },  
      token,
      refreshToken, // Include refresh token in the response
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get user profile (Authentication required)
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the authenticated user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Token missing or invalid
 */
// Profile Route (Authentication Required)
router.get('/me', authenticateWithToken, (req, res) => {
  res.status(200).json(req.user);
});

/**
 * @swagger
 * /api/auth/adminData:
 *   get:
 *     summary: Access admin-only route
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 *       403:
 *         description: Forbidden - User lacks admin role
 *       401:
 *         description: Unauthorized - Token missing or invalid
 */
// Admin-Only Route (Role-Based Access Control)
router.get('/adminData', authenticateWithToken,  authorizeRoles('admin'), async (req, res) => {
  try {
    const adminData = await UserService.getAdminData();
    res.status(200).json({ success: true, data: adminData });
  } catch (error) {
    logger.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Unable to fetch admin data' });
  }
});

/**
 * @swagger
 * /api/auth/userResources:
 *   get:
 *     summary: Access registered user resources (Authentication required)
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted to registered users and admins
 *       403:
 *         description: Forbidden - User lacks necessary role
 *       401:
 *         description: Unauthorized - Token missing or invalid
 */

// Registered User-Only Route
router.get('/userResources', authenticateWithToken, authorizeRoles('Registered', 'admin'), async (req, res) => {
  try {
    const userResources = await UserService.getUserResources();
    res.status(200).json({ success: true, data: userResources });
  } catch (error) {
    logger.error('Error fetching user resources:', error);
    res.status(500).json({ error: 'Unable to fetch user resources' });
  }
});

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token to validate
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: New JWT access token
 *       401:
 *         description: Invalid or expired refresh token
 */

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }

  try {
    // Verify the refresh token
    const decoded = verifyToken(refreshToken, 'refreshSecret'); // Use a different secret for refresh tokens
    const user = await UserService.findUserById(decoded.id); // Assuming you have a method to find user by ID

    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Generate a new access token
    const token = generateToken({ id: user.id, role: user.role });

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});

// Logout Route (Authentication Required)
router.post('/logout', authenticateWithToken, (req, res) => {
  req.session?.destroy((err) => {
    if (err) {
      log.error('Error during session destruction:', err);
      return res.status(500).json({ success: false, message: 'Error logging out' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

export default router;
