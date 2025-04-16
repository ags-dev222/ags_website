import express from 'express';
import { authenticateWithToken, requireAuth, authorizeRoles } from './middleware/auth.js';
import { 
    createStartup, 
    getStartups, 
    getStartupById, 
    updateStartup, 
    deleteStartup 
} from '../controllers/startup.js';

const router = express.Router();

// Create startup (requires authentication and role check for 'registered' or 'admin')
router.post('/create', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), createStartup);

// Get all startups (requires authentication and role check for 'registered' or 'admin')
// Can filter by sector, fundingStage, location
router.get('/', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), getStartups);

// Get a specific startup by ID (requires authentication and role check for 'registered' or 'admin')
router.get('/:id', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), getStartupById);

// Update a specific startup by ID (requires authentication and role check for 'registered' or 'admin')
router.put('/:id', authenticateWithToken, requireAuth, authorizeRoles('registered', 'admin'), updateStartup);

// Delete a startup (admin only)
router.delete('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), deleteStartup);

export default router;