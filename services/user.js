const { randomUUID } = require('crypto');

const User = require('../models/user.js');
const { generatePasswordHash } = require('../utils/password.js');

class UserService {

  //find all users
  static async list() {
    try {
      return User.find();
    } catch (err) {
      throw new Error(`Database error while listing users: ${err.message}`);
    }
  }

  //get a user by id
  static async get(id) {
    try {
      return User.findOne({ _id: id }).exec();
    } catch (err) {
      throw new Error(`Database error while getting the user by their ID: ${err.message}`);
    }
  }

  //get a user by email
  static async getByEmail(email) {
    try {
      return User.findOne({ email }).exec();
    } catch (err) {
      throw new Error(`Database error while getting the user by their email: ${err.message}`);
    }
  }

  //update a user by id 
  static async update(id, data) {
    try {
      return User.findOneAndUpdate({ _id: id }, data, { new: true, upsert: false });
    } catch (err) {
      throw new Error(`Database error while updating user ${id}: ${err.message}`);
    }
  }

  //delete a user by id 
  static async delete(id) {
    try {
      const result = await User.deleteOne({ _id: id }).exec();
      return (result.deletedCount === 1);
    } catch (err) {
      throw new Error(`Database error while deleting user ${id}: ${err.message}`);
    }
  }

  //authenticate a user
  static async authenticateWithPassword(email, password) {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    try {
      const user = await User.findOne({email}).exec();
      if (!user) return null;

      const passwordValid = await validatePassword(password, user.password);
      if (!passwordValid) return null;

      user.lastLoginAt = Date.now();
      const updatedUser = await user.save();
      return updatedUser;
    } catch (err) {
      throw new Error(`Database error while authenticating user ${email} with password: ${err.message}`);
    }
  }

  //authenticate a user with a token
  static async authenticateWithToken(token) {
    try {
      return User.findOne({ token }).exec();
    } catch (err) {
      throw new Error(`Database error while authenticating user with token: ${err.message}`);
    }
  }

  //regenerate token
  static async regenerateToken(user) {
    user.token = randomUUID();

    try {
      if (!user.isNew) {
        await user.save();
      }

      return user;
    } catch (err) {
      throw new Error(`Database error while generating user token: ${err.message}`);
    }
  }

  //create a user using email, name and password
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
      throw new Error(`Database error while creating new user: ${err.message}`);
    }
  }

  //set user password
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

module.exports = UserService;