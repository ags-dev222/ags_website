import { randomUUID } from 'crypto';
import User from '../models/user.js';
import { generatePasswordHash, validatePassword } from '../utils/password.js';

class UserService {
  static async list() {
    try {
      return User.find();
    } catch (err) {
      throw new Error(`Unable to list users: ${err.message}`);
    }
  }

  static async get(id) {
    try {
      return User.findOne({ _id: id }).exec();
    } catch (err) {
      throw new Error(`Error getting the user by their ID: ${err.message}`);
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
      return updatedUser;
    } catch (err) {
      throw new Error(`Error while authenticating user ${email} with password: ${err.message}`);
    }
  }

  static async regenerateToken(user) {
    user.token = randomUUID();

    try {
      if (!user.isNew) {
        await user.save();
      }

      return user;
    } catch (err) {
      throw new Error(`Error while generating user token: ${err.message}`);
    }
  }

  static async createUser({ email, password, name }) {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    if (!name) throw new Error('Name is required');

    const existingUser = await UserService.getByEmail(email);
    if (existingUser) throw new Error('User with this email already exists');

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const hash = await generatePasswordHash(password);

    try {
      const user = new User({
        email,
        password: hash,
        name,
      });

      await user.save();
      return user;
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        throw new Error(errors.join(', '));
      }
      throw new Error(`Error while creating new user: ${err.message}`);
    }
  }

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
}

export default UserService;
