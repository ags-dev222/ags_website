// Blog routes with Role-Based Access Control and Authentication
import express from 'express';
import { authorizeRoles, authenticateWithToken, requireAuth } from './middleware/auth.js';
import {
  createBlog,
  updateBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  addCommentToBlog, 
  getBlogWithComments,
} from '../controllers/blogController.js';


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
 *     Blog:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the blog post
 *         content:
 *           type: string
 *           description: Content of the blog post
 *         author:
 *           type: string
 *           description: Author of the blog post
 *         userEmail:
 *           type: string
 *           description: User email associated with the blog post (optional)
 *         deviceToken:
 *           type: string
 *           description: Device token associated with the blog post (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date the blog post was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date the blog post was last updated
 *         status:
 *           type: string
 *           enum: [draft, published, archived]
 *           description: Status of the blog post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the blog post
 *         category:
 *           type: string
 *           description: Category of the blog post
 *         media:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL of the media
 *               type:
 *                 type: string
 *                 description: Type of media (image/video)
 *         views:
 *           type: integer
 *           description: Number of views for the blog post
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user who commented
 *               comment:
 *                 type: string
 *                 description: The comment text
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: Time when the comment was made

 *
 *     BlogResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Blog'
 *         success:
 *           type: boolean
 *
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /api/blog/create:
 *   post:
 *     summary: Create a new blog post (Admin only)
 *     tags:
 *       - Blog
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 */

// Admin only route for creating a blog post
// Authenticate token and ensure the user is an admin
router.post('/create', authenticateWithToken, requireAuth, authorizeRoles('admin'), createBlog); 

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add a comment to a blog post
 *     tags: 
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blogId
 *               - content
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: ID of the blog to comment on
 *               content:
 *                 type: string
 *                 description: Text of the comment
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment added successfully
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (role restriction)
 */

router.post('/comments/:id',authenticateWithToken, requireAuth, authorizeRoles('Registered', 'Public', 'admin' ), addCommentToBlog);


/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get blogs with their comments (admin only)
 *     tags: 
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of blog posts with comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogWithComments'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 */
//Admin to get all comments by blogid
router.get('/comments', authenticateWithToken, requireAuth, authorizeRoles('admin'), getBlogWithComments);


/**
 * @swagger
 * /api/blog/update/{id}:
 *   put:
 *     summary: Update an existing blog post (Admin only)
 *     tags:
 *       - Blog
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Blog post not found
 */

// Admin only route for updating a blog post
// Authenticate token and ensure the user is an admin
router.put('/update/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), updateBlog); 


/**
 * @swagger
 * /api/blog/:
 *   get:
 *     summary: Get all blog posts (Public access)
 *     tags:
 *       - Blog
 *     responses:
 *       200:
 *         description: List of all blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Error retrieving blog posts
 */
// Public access route to get all blog posts (no authentication required)
router.get('/', getAllBlogs); 

/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Get a single blog post by ID (Public access)
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested blog post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Error retrieving blog post
 */

// Public access route to get a single blog post by ID (no authentication required)
router.get('/:id', getBlogById); 


/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     summary: Delete a blog post by ID (Admin only)
 *     tags:
 *       - Blog
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Blog post not found
 */

router.delete('/:id', authenticateWithToken, requireAuth, authorizeRoles('admin'), deleteBlog); 

// Authenticate token and ensure the user is an admin


export default router;
