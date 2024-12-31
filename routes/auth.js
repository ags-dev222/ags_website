const express = require('express');
const UserService = require('../services/user.js');
const { requireUser } = require('./middleware/auth.js');
const logger = require('../utils/log.js');
const { validateRegistrationInput } = require('./middleware/validation.js');

const router = express.Router();
const log = logger('api/routes/authRoutes');

//login 
router.post('/login', async (req, res) => {
  const sendError = msg => res.status(400).json({ error: msg });
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError('Email and password are required');
  }

  const user = await UserService.authenticateWithPassword(email, password);

  if (user) {
    return res.json(user);
  } else {
    return sendError('Email or password is incorrect');
  }
});

//register
router.post('/register', validateRegistrationInput, async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    log.error('Error while registering user', error);
    return res.status(400).json({ error: error.message });
  }
});

//logout 
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error during session destruction:', err);
      return res.status(500).json({ success: false, message: 'Error logging out' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

router.all('/api/auth/logout', async (req, res) => {
  if (req.user) {
    await UserService.regenerateToken(req.user);
  }
  return res.status(204).send();
});

router.get('/me', requireUser, async (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = router;
