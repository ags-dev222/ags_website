import express from 'express';
import { authenticateWithToken, authorizeRoles } from './middleware/auth.js';
import {
  getDashboardOverview,
  getUserAnalytics,
  getBusinessIntelligence,
  getRealTimeMetrics,
  exportAnalytics
} from '../controllers/analyticsController.js';

const router = express.Router();

// ============================================
// ANALYTICS ROUTES - SUPERADMIN ONLY
// ============================================

/**
 * 📊 DASHBOARD OVERVIEW
 * High-level metrics for the main dashboard
 */
router.get('/dashboard', 
  authenticateWithToken, 
  authorizeRoles('superadmin'), 
  getDashboardOverview
);

/**
 * 👥 USER ANALYTICS
 * Detailed user behavior and demographics
 */
router.get('/users', 
  authenticateWithToken, 
  authorizeRoles('superadmin'), 
  getUserAnalytics
);

/**
 * 📈 BUSINESS INTELLIGENCE
 * Advanced metrics for strategic decisions
 */
router.get('/intelligence', 
  authenticateWithToken, 
  authorizeRoles('superadmin'), 
  getBusinessIntelligence
);

/**
 * 🎯 REAL-TIME METRICS
 * Live dashboard data
 */
router.get('/realtime', 
  authenticateWithToken, 
  authorizeRoles('superadmin'), 
  getRealTimeMetrics
);

/**
 * 📊 EXPORT ANALYTICS
 * Export data in various formats (JSON, CSV)
 */
router.get('/export', 
  authenticateWithToken, 
  authorizeRoles('superadmin'), 
  exportAnalytics
);

export default router;
