import mongoose from 'mongoose';
import * as BlogService from '../services/BlogService.js';

// Create a new blog post and trigger notifications
export const createBlog = async (req, res) => {
  const { title, content, author, userEmail, deviceToken } = req.body;

  if (!title || !content || !author ) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }

  try {
    const newBlog = await BlogService.createBlog({
      title,
      content,
      author,
      userEmail,
      deviceToken,
    });

    res.status(201).json({
      message: 'Blog created successfully',
      blog: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
};

// Update an existing blog post and trigger notifications
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, author, userEmail, deviceToken } = req.body;

  if (!title || !content || !author ) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }

  try {
    const updatedBlog = await BlogService.updateBlog(id, {
      title,
      content,
      author,
      userEmail,
      deviceToken,
    });

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({
      message: 'Blog updated successfully',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
};

// Get all blog posts with pagination
export const getAllBlogsPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const { blogs, totalBlogs } = await BlogService.getAllBlogs(page, limit);
    res.json({
      message: 'Blogs retrieved successfully',
      blogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
};

// Get a single blog post by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogService.getBlogById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({ blog });
  } catch (error) {
    console.error('Error retrieving blog:', error);
    res.status(500).json({ error: 'Failed to retrieve blog post' });
  }
};

// Delete a blog post
export const deleteBlogById = async(req, res) => {
  const { id } = req.params;

  //validate the id with the mongodb objectID
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ error: 'Invalid blog ID format' });
  }

  try {
    const deleteBlog = await BlogService.deleteBlogById(id);
    if(!deleteBlog) {
      return res.status(404).json({ error: 'Blog post not found '})
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
};