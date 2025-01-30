//focus on database interaction
//trigger both push notification and email notification

import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import Blog from '../models/Blog.js';
import { sendPushNotification } from '../utils/pushNotifs.js'
import { sendBlogPostNotification } from '../utils/email.js';



// Create a new blog and send notifications
export const createBlog = async (data) => {
  const { title, content, author, userEmail, deviceToken } = data;


  const newBlog = new Blog({ title, content, author, userEmail, deviceToken });
  const savedBlog = await newBlog.save();

  // Send email notification
  if (userEmail) {
    await sendBlogPostNotification(userEmail, { title, summary: content });
  }

  // Send push notification
  if (deviceToken) {
    await sendPushNotification(deviceToken, { title, date: savedBlog.createdAt });
  }

  return savedBlog;
};


// Update a blog and send notifications
export const updateBlog = async (id, data) => {
  const { title, content, author, userEmail, deviceToken } = data;

  // Update the blog post, including deviceToken
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, content, author, userEmail, deviceToken, updatedAt: Date.now() },
    { new: true } // Return the updated document
  );

  // Send email notification
  if (userEmail) {
    await sendBlogPostNotification(userEmail, { title, summary: content });
  }

  // Send push notification
  if (deviceToken) {
    await sendPushNotification(deviceToken, { title, date: updatedBlog.updatedAt });
  }

  return updatedBlog;
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
  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid blog post ID');
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error('Blog post not found');
    }
    return blog;
  } catch (error) {
    throw new Error(`Error retrieving blog post: ${error.message}`);
  }
};

// deleteblog
export const deleteBlogById = async (id) =>{
  const ObjectId = new mongoose.Types.ObjectId(id) ;
  return await Blog.findByIdAndDelete(ObjectId);
}