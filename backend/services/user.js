import { randomUUID } from 'crypto';
import User from '../models/User.js';

import { generatePasswordHash, validatePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js'; 


class UserService {
  static async list() {
    try {
      return User.find();
    } catch (err) {
      throw new Error(`Unable to list users: ${err.message}`);
    }
  }

  static async get(id) {
    if (!id) throw new Error('User ID is required');
    try {
      const user = await User.findById(id).exec();
      if (!user) {
        console.warn(`No user found with ID: ${id}`);
        return null; 
      }
      return user;
    } catch (err) {
      console.error(`Error retrieving user by ID ${id}:`, err.message);
      throw new Error(`Error fetching user: ${err.message}`);
    }
  }
  

  static async getByEmail(email) {
    try {
      return User.findOne({ email }).exec();
    } catch (err) {
      throw new Error(`Error while getting the user by their email: ${err.message}`);
    }
  }

  static async update(id, data) {
    try {
      return User.findOneAndUpdate({ _id: id }, data, { new: true, upsert: false });
    } catch (err) {
      throw new Error(`Error while updating user ${id}: ${err.message}`);
    }
  }

  static async delete(id) {
    try {
      const result = await User.deleteOne({ _id: id }).exec();
      return result.deletedCount === 1;
    } catch (err) {
      throw new Error(`Error while deleting user ${id}: ${err.message}`);
    }
  }
//GetRegisteredUsers Data
static async getUserResources(){
  try {
    const registered = await User.findOne({ role: 'Registered' }).exec();
    if(!registered){
      throw new Error('No registered user found');
    }
    return registered;
  }catch (err){
    throw new Error (`Unable to fecth registered data: ${err.message}`);
  }
}

  //GetAdmin Data
  static async getAdminData() {
    try {
      const admin = await User.findOne({ role: 'Admin' }).exec();
      if (!admin) {
        throw new Error('No admin found');
      }
      return admin;
    } catch (err) {
      throw new Error(`Unable to fetch admin data: ${err.message}`);
    }
  }
  

  // Authenticate user with email and password
  static async authenticateWithPassword(email, password) {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    try {
      const user = await User.findOne({ email }).exec();
      if (!user) return null;

      const passwordValid = await validatePassword(password, user.password);
      if (!passwordValid) return null;

      user.lastLoginAt = Date.now();
      const updatedUser = await user.save();

      // Generate JWT token after successful authentication
      const token = generateToken(updatedUser);

      return { user: updatedUser, token };
    } catch (err) {
      throw new Error(`Error while authenticating user ${email} with password: ${err.message}`);
    }
  }

  // Regenerate JWT token for the user
  static async regenerateToken(user) {
    try {
      // Generate a new JWT token
      const token = generateToken(user);

      // Optionally, save the token if you are storing it in the database
      user.token = token;
      await user.save();

      return token;
    } catch (err) {
      throw new Error(`Error while regenerating token for user: ${err.message}`);
    }
  }

  // Create a new user with hashed password
  static async createUser({ email, password, name, role = 'Public' }) {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    if (!name) throw new Error('Name is required');
  
    // Check if the user already exists
    const existingUser = await UserService.getByEmail(email);
    if (existingUser) throw new Error('User with this email already exists');
  
    // Password length validation
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
  
    // Hash the password
    const hash = await generatePasswordHash(password);
  
    try {
      const user = new User({
        email,
        password: hash,
        name,
        role, 
      });
  
      // Save the new user in the database
      await user.save();
  
      // Generate JWT token after successful user creation
      const token = generateToken(user);
  
      return { user, token }; // Return the user and the generated token
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        throw new Error(errors.join(', '));
      }
      throw new Error(`Error while creating new user: ${err.message}`);
    }
  }

  // Set or update user's password
  static async setPassword(user, password) {
    if (!password) throw new Error('Password is required');
    user.password = await generatePasswordHash(password);

    try {
      if (!user.isNew) {
        await user.save();
      }

      return user;
    } catch (err) {
      throw new Error(`Database error while setting user password: ${err.message}`);
    }
  }

  // Authenticate user using a token (for JWT-based authentication)
  static async authenticateWithToken(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error authenticating user with token:', error);
      throw error;
    }
  }
}

export default UserService;