import express from 'express';
import { authenticateWithToken, authorizeRoles } from './middleware/auth.js';
import { PERMISSIONS, requirePermission } from '../utils/permissions.js';
import UserService from '../services/user.js';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';
import logger from '../utils/log.js';

const router = express.Router();

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// ============================================
// USER MANAGEMENT ROUTES (Admin Panel)
// ============================================

// Get all users (Admin/SuperAdmin only)
router.get('/', 
  authenticateWithToken, 
  requirePermission(PERMISSIONS.VIEW_USERS), 
  async (req, res) => {
    try {
      const { page = 1, limit = 10, role, search, sortBy = 'createdAt', order = 'desc' } = req.query;
      
      const filter = {};
      if (role && role !== 'all') filter.role = role;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      const users = await User.find(filter)
        .select('-password -token')
        .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await User.countDocuments(filter);

      res.json({
        users,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      });
    } catch (error) {
      logger.error('Error fetching users:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Get user by ID
router.get('/:id',
  authenticateWithToken,
  requirePermission(PERMISSIONS.VIEW_USERS),
  async (req, res) => {
    try {
      const user = await UserService.get(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      logger.error('Error fetching user:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Create new user (Admin/SuperAdmin only)
router.post('/',
  authenticateWithToken,
  requirePermission(PERMISSIONS.CREATE_USERS),
  async (req, res) => {
    try {
      const { email, password, name, role = 'registered', department } = req.body;
      
      // Validation
      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, password, and name are required' });
      }

      // SuperAdmin can create any role, Admin cannot create SuperAdmin
      if (role === 'superadmin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'Only SuperAdmin can create SuperAdmin users' });
      }

      const { user, token } = await UserService.createUser({
        email,
        password,
        name,
        role,
        department
      });

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          department: user.department,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      logger.error('Error creating user:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Update user
router.put('/:id',
  authenticateWithToken,
  requirePermission(PERMISSIONS.MANAGE_USERS),
  async (req, res) => {
    try {
      const { name, role, department, isActive } = req.body;
      const userId = req.params.id;

      // Check if user exists
      const existingUser = await UserService.get(userId);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Role change restrictions
      if (role && role !== existingUser.role) {
        // Only SuperAdmin can change roles to/from SuperAdmin
        if ((role === 'superadmin' || existingUser.role === 'superadmin') && req.user.role !== 'superadmin') {
          return res.status(403).json({ error: 'Only SuperAdmin can manage SuperAdmin roles' });
        }
        
        // Users cannot change their own role
        if (userId === req.user._id.toString()) {
          return res.status(403).json({ error: 'Cannot change your own role' });
        }
      }

      const updateData = {};
      if (name) updateData.name = name;
      if (role) updateData.role = role;
      if (department) updateData.department = department;
      if (typeof isActive === 'boolean') updateData.isActive = isActive;

      const updatedUser = await UserService.update(userId, updateData);
      
      res.json({
        message: 'User updated successfully',
        user: updatedUser
      });
    } catch (error) {
      logger.error('Error updating user:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Upload profile picture
router.post('/:id/avatar',
  authenticateWithToken,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const userId = req.params.id;
      
      // Users can only update their own avatar, or admins can update anyone's
      if (userId !== req.user._id.toString() && !req.user.permissions.canManageUsers) {
        return res.status(403).json({ error: 'Permission denied' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const profilePictureUrl = `/uploads/profiles/${req.file.filename}`;
      await UserService.update(userId, { profilePicture: profilePictureUrl });

      res.json({
        message: 'Profile picture updated successfully',
        profilePicture: profilePictureUrl
      });
    } catch (error) {
      logger.error('Error uploading profile picture:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete user (SuperAdmin/Admin only)
router.delete('/:id',
  authenticateWithToken,
  requirePermission(PERMISSIONS.DELETE_USERS),
  async (req, res) => {
    try {
      const userId = req.params.id;
      
      // Cannot delete yourself
      if (userId === req.user._id.toString()) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
      }

      const userToDelete = await UserService.get(userId);
      if (!userToDelete) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Only SuperAdmin can delete SuperAdmin accounts
      if (userToDelete.role === 'superadmin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ error: 'Only SuperAdmin can delete SuperAdmin accounts' });
      }

      const success = await UserService.delete(userId);
      if (success) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(500).json({ error: 'Failed to delete user' });
      }
    } catch (error) {
      logger.error('Error deleting user:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Get user statistics (for dashboard)
router.get('/stats/overview',
  authenticateWithToken,
  requirePermission(PERMISSIONS.VIEW_ANALYTICS),
  async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const activeUsers = await User.countDocuments({ isActive: true });
      const usersByRole = await User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ]);
      
      const recentUsers = await User.find()
        .select('name email role createdAt')
        .sort({ createdAt: -1 })
        .limit(5);

      res.json({
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        byRole: usersByRole,
        recent: recentUsers
      });
    } catch (error) {
      logger.error('Error fetching user statistics:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
