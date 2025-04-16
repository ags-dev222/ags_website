import { createBlogService, getAllBlogsService, getBlogByIdService, updateBlogService, deleteBlogByIdService, addCommentToBlogService,
  getBlogWithCommentsService, } from '../services/BlogService.js'; 
import { validateCreateBlog, validateUpdateBlog } from '../validators/blogValidator.js';

export const createBlog = async (req, res) => {
  const { error } = validateCreateBlog(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { title, content, author, tags, category, media } = req.body;

  try {
    const newBlog = await createBlogService({ title, content, author, tags, category, media });
    res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const addCommentToBlog = async (req, res) => {
  try {
    const { blogId } = req.params; 
    const { content } = req.body; 

    // Validate if content is provided
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Content cannot be empty' });
    }

  
    if (!ObjectId.isValid(blogId)) {
      return res.status(400).json({ error: 'Invalid blog ID format' });
    }

    // Ensure user is authenticated
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    
    const comment = await addCommentToBlogService({ blogId, userId, content });

    // Return success response with the added comment
    res.status(201).json({
      message: 'Comment added successfully',
      comment,
    });

  } catch (error) {
    console.error('Add Comment Error:', error); 
    console.error('Error Stack:', error.stack); 
    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }
    if (error.status === 400) {
      return res.status(400).json({ error: error.message });
    }
    // For any other errors, return a generic server error
    res.status(500).json({ error: 'An error occurred while adding the comment' });
  }
};


export const getBlogWithComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blogWithComments = await getBlogWithCommentsService(blogId);

    res.status(200).json(blogWithComments);
  } catch (error) {
    console.error("Error adding comment:", error.message); // Log the error message
    res.status(500).json({ error: "An error occurred while adding the comment" });
  }
};


export const getAllBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
  try {
    const blogs = await getAllBlogsService(page, limit);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch blogs' });
  }
};

// Get a blog post by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await getBlogByIdService(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    // Increment views count
    blog.views += 1; 
    await blog.save(); // Save the updated blog

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch blog' });
  }
};

export const updateBlog = async (req, res) => {
  const { error } = validateUpdateBlog(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { id } = req.params;
  const { title, content, author, tags, category, media, comments } = req.body;

  try {
    const updatedBlog = await updateBlogService(id, { title, content, author, tags, category, media, comments });
    res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a blog post
export const deleteBlog = async (req, res) => {
  try {
    await deleteBlogByIdService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
