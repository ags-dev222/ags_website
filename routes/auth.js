import express from 'express';
import UserService from '../services/user.js';
import { generateToken } from '../utils/jwt.js';
import logger from '../utils/log.js';
import requireUser from '../routes/middleware/requireUser.js';

const router = express.Router();
const log = logger('api/routes/authRoutes');

//login 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Authenticate user with email and password
    const user = await UserService.authenticateWithPassword(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token for the authenticated user
    const token = generateToken(user);

    // Store the token in the session
    req.session.userId = user._id;  // Store the user ID in the session
    req.session.token = token;  // Store the generated token in the session

    // Respond with user data and token
    res.json({ user, token });
  } catch (error) {
    log.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});



//register a user
router.post('/register', async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error while registering user', error);
    res.status(400).json({ error: error.message });
  }
});



//logout
router.post('/logout', (req, res) => {
  req.session?.destroy(err => {
    if (err) {
      log.error('Error during session destruction:', err);
      return res.status(500).json({ success: false, message: 'Error logging out' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

router.all('/api/auth/logout', async (req, res) => {
  if (req.user) {
    await UserService.regenerateToken(req.user);
  }
  res.status(204).send();
});

router.get('/me', requireUser, async (req, res) => {
  res.status(200).json(req.user);
});

export default router;
