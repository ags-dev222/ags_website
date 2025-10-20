import express from 'express';
import { authenticateWithToken, authorizeRoles } from './middleware/auth.js';
import {
  requestRoleUpgrade,
  getPendingRoleRequests,
  processRoleRequest,
  getUserRoleStatus,
  bulkRoleUpdate
} from '../controllers/roleController.js';

const router = express.Router();

// ============================================
// ROLE REQUEST ROUTES
// ============================================

/**
 * 🎯 REQUEST ROLE UPGRADE
 * - Registered users can request editor/admin roles
 * - Requires authentication
 */
router.post('/request', authenticateWithToken, requestRoleUpgrade);

/**
 * 🎯 GET USER'S CURRENT ROLE STATUS
 * - Check current role and any pending requests
 */
router.get('/status', authenticateWithToken, getUserRoleStatus);

// ============================================
// ADMIN ROLE MANAGEMENT ROUTES
// ============================================

/**
 * 🎯 GET PENDING ROLE REQUESTS
 * - SuperAdmin only
 * - Paginated list of pending requests
 */
router.get('/requests', 
  authenticateWithToken, 
  authorizeRoles('superadmin'), 
  getPendingRoleRequests
);

/**
 * 🎯 APPROVE/REJECT ROLE REQUEST
 * - SuperAdmin only
 * - Process individual role requests
 */
router.put('/requests/:userId', 
  authenticateWithToken, 
  authorizeRoles('superadmin'), 
  processRoleRequest
);

/**
 * 🎯 BULK ROLE OPERATIONS
 * - SuperAdmin only
 * - Approve/reject multiple requests at once
 */
router.post('/bulk', 
  authenticateWithToken, 
  authorizeRoles('superadmin'), 
  bulkRoleUpdate
);

export default router;
