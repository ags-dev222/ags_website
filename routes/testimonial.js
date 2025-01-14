import express from 'express';
import { 
    createTestimonial, 
    getTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial 
} 
from '../controllers/testimonial.js';
import { requireAuth } from './middleware/auth.js';

const router = express.Router();

router.post('/testimonials/create', requireAuth, createTestimonial);
router.get('/testimonials/:startupId', getTestimonials); // Get testimonials for a specific startup
router.get('/:id', getTestimonialById);
router.put('/:id', requireAuth, updateTestimonial);
router.delete('/:id', requireAuth, deleteTestimonial);

export default router;
