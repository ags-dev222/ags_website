

//trigger both push notification and email notification

import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import { sendPushNotification } from '../utils/pushNotifs.js';
import { sendBlogPostNotification } from '../utils/email.js';



// Create a new blog and send notifications
export const createBlogService = async (data) => {
  const { title, content, author, userEmail, tags, category, media, deviceToken } = data;

  const existingBlog = await Blog.findOne({ title });
  if (existingBlog) {
    throw new Error('Blog title must be unique');
  }
  const newBlog = new Blog({ title, content, author, userEmail, tags, category, media });


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


//Addcomment
export const addCommentToBlogService = async ({ blogId, userId, content }) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new Error('Blog not found');
  }

  const comment = new Comment({
    blog: blogId,
    user: userId,
    content,
  });

  const savedComment = await comment.save();


  blog.comments.push(savedComment._id);
  await blog.save();

  return savedComment;
};


//Get a blog with comments
export const getBlogWithCommentsService = async (blogId) => {
  const blog = await Blog.findById(blogId)
    .populate({
      path: 'comments',
      populate: { path: 'user', select: 'name email' }, 
    });

  if (!blog) {
    throw new Error('Blog not found');
  }

  return blog;
};


// Update a blog and send notifications
export const updateBlogService = async (id, data) => {
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
export const getAllBlogsService = async (page, limit) => {
  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const totalBlogs = await Blog.countDocuments();
  return { blogs, totalBlogs };
};


export const incrementBlogViews = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error('Blog post not found');
  }
  blog.views += 1; // Increment views count
  await blog.save(); // Save the updated blog
};

export const getBlogByIdService = async (id) => {
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
export const deleteBlogByIdService = async (id) =>{
  const ObjectId = new mongoose.Types.ObjectId(id) ;
  return await Blog.findByIdAndDelete(ObjectId);
}
