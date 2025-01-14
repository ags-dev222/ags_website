/**createStartup, getStartups, getStartUpById, updateStartup, DeleteStartup */

import express from 'express';
import { 
    createStartup, 
    getStartups, 
    getStartupById, 
    updateStartup,
    deleteStartup
 } 
 from '../controllers/startup.js';
import { requireAuth } from './middleware/auth.js';

const router = express.Router();

router.post('/startups/create', requireAuth, createStartup);
router.get('/startups', getStartups); // For filtering by sector, fundingStage, and location
router.get('/startups/:id', getStartupById);
router.put('/startups/:id', requireAuth, updateStartup);
router.delete('/startups/:id', requireAuth, deleteStartup);

export default router;
