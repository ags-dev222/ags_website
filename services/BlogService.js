//focus on database interaction
import Blog from '../models/Blog.js';

// Create a new blog
export const createBlog = async (data) => {
  const { title, content, author } = data;
  const newBlog = new Blog({ title, content, author });
  return await newBlog.save();
};

// Update a blog
export const updateBlog = async (id, data) => {
  const { title, content, author } = data;
  return await Blog.findByIdAndUpdate(
    id,
    { title, content, author, updatedAt: Date.now() },
    { new: true }
  );
};

// Get all blogs with pagination
export const getAllBlogs = async (page, limit) => {
  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const totalBlogs = await Blog.countDocuments();
  return { blogs, totalBlogs };
};

// Get a single blog by ID
export const getBlogById = async (id) => {
  return await Blog.findById(id);
};

// Delete a blog
export const deleteBlogById = async (id) => {
  return await Blog.findByIdAndDelete(id);
};
