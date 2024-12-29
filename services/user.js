const { randomUUID } = require('crypto');

const User = require('../models/User.js');
const { generatePasswordHash, validatePassword } = require('../utils/password.js');

class UserService {
  
  //finding users
  static async list() {
    try {
      return User.find();
    } catch (err) {
      throw `Unable to list users: ${err}`;
    }
  }

  //finding a user by an id
  static async get(id) {
    try {
      return User.findOne({ _id: id }).exec();
    } catch (err) {
      throw `Unable to  get the user by their ID: ${err}`;
    }
  }

  //finding a user by email
  static async getByEmail(email) {
    try {
      return User.findOne({ email }).exec();
    } catch (err) {
      throw `Database error while getting the user by their email: ${err}`;
    }
  }

  // update a user by an id and data
  static async update(id, data) {
    try {
      return User.findOneAndUpdate({ _id: id }, data, { new: true, upsert: false });
    } catch (err) {
      throw `Error while updating user ${id}: ${err}`;
    }
  }

  //deleting a user by an id 
  static async delete(id) {
    try {
      const result = await User.deleteOne({ _id: id }).exec();
      return (result.deletedCount === 1);
    } catch (err) {
      throw `Error while deleting user ${id}: ${err}`;
    }
  }

  //authentication
  static async authenticateWithPassword(email, password) {
    if (!email) throw 'Email is required';
    if (!password) throw 'Password is required';

    try {
      const user = await User.findOne({email}).exec();
      if (!user) return null;

      const passwordValid = await validatePassword(password, user.password);
      if (!passwordValid) return null;

      user.lastLoginAt = Date.now();
      const updatedUser = await user.save();
      return updatedUser;
    } catch (err) {
      throw `Database error while authenticating user ${email} with password: ${err}`;
    }
  }

  //token authentication
  static async authenticateWithToken(token) {
    try {
      return User.findOne({ token }).exec();
    } catch (err) {
      throw `Database error while authenticating user ${email} with token: ${err}`;
    }
  }

  //regenerate a new token
  static async regenerateToken(user) {
    user.token = randomUUID(); // eslint-disable-line

    try {
      if (!user.isNew) {
        await user.save();
      }

      return user;
    } catch (err) {
      throw `Database error while generating user token: ${err}`;
    }
  }

  //create a user by email, password and name
  static async createUser({ email, password, name = '' }) {
    if (!email) throw 'Email is required';
    if (!password) throw 'Password is required';

    const existingUser = await UserService.getByEmail(email);
    if (existingUser) throw 'User with this email already exists';

    const hash = await generatePasswordHash(password);

    try {
      const user = new User({
        email,
        password: hash,
        name,
        token: randomUUID(),
      });

      await user.save();
      return user;
    } catch (err) {
      throw `Database error while creating new user: ${err}`;
    }
  }

  //user set a password
  static async setPassword(user, password) {
    if (!password) throw 'Password is required';
    user.password = await generatePasswordHash(password); // eslint-disable-line

    try {
      if (!user.isNew) {
        await user.save();
      }

      return user;
    } catch (err) {
      throw `Database error while setting user password: ${err}`;
    }
  }
}

module.exports = UserService;
