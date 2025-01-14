import express from 'express'; 
import UserService from '../services/user.js'; 
import { generateToken } from '../utils/jwt.js'; 
import logger from '../utils/log.js';
import requireUser from '../routes/middleware/requireUser.js';

const router = express.Router();
const log = logger('api/routes/authRoutes');

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Authenticate user with email and password
    const { user, token } = await UserService.authenticateWithPassword(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    req.session.userId = user._id;  
    req.session.token = token;  

    // Respond with user data and token
    res.json({
      message: 'Login successful',
      user: { email: user.email, name: user.name },
      token, // Send the token back
    });
  } catch (error) {
    log.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Register Route
router.post('/registerUser', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const { user, token } = await UserService.createUser({ email, password, name });

    res.status(201).json({
      message: 'User registered successfully',
      user: { email: user.email, name: user.name },
      token,
    });
  } catch (error) {
    log.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});


// Logout Route
router.post('/logout', (req, res) => {
  req.session?.destroy(err => {
    if (err) {
      log.error('Error during session destruction:', err);
      return res.status(500).json({ success: false, message: 'Error logging out' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// User Profile (me)
router.get('/me', requireUser, async (req, res) => {
  res.status(200).json(req.user);
});

export default router;
