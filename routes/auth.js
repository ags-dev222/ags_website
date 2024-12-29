const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { comparePassword } = require('../utils/password');
const { v4: uuidv4 } = require('uuid'); // Add this at the top of the file

//register with email, username, phonenumber and password
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Attempting to register user:', email); // New log

    // Validate input
    if (!email || !password) {
      console.log('Registration failed: Email or password missing'); // New log
      return res.status(400).json({ error: 'Email and password are required' });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Registration failed: User already exists', email); // New log
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Generate a unique token
    const token = uuidv4();

    // Create new user with a unique token
    const user = new User({ email, password, token });
    console.log('Saving new user to database:', email); // New log
    await user.save();
    console.log('User successfully saved:', email); // New log

    // Generate JWT token
    const jwtToken = generateToken(user._id);

    res.status(201).json({ token: jwtToken });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error during registration' });
  }
});

//login with email and password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error during login' });
  }
});

module.exports = router;