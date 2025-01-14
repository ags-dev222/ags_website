import express from 'express';
import {
    createSignup,
    getSignups,
    getSignupById,
    deleteSignup
} from '../controllers/signup.js';
import { requireAuth } from '../routes/middleware/auth.js'

const router = express.Router();

router.post('/signups/create', requireAuth, createSignup);
router.get('/signups', getSignups);
router.get('/signups/:id', getSignupById);
router.delete('/signups/:id', deleteSignup);

export default router;