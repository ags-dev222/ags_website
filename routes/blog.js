import express from 'express';
import { requireAuth } from './middleware/auth.js';
import {
  createBlog,
  updateBlog,
  getAllBlogsPosts,
  getBlogById,
  deleteBlogById,
} from '../controllers/blog.js';

const router = express.Router();

router.post('/create', requireAuth, createBlog);
router.put('/update/:id', requireAuth, updateBlog);
router.get('/', getAllBlogsPosts);
router.get('/:id', getBlogById);
router.delete('/:id', requireAuth, deleteBlogById);

export default router;
