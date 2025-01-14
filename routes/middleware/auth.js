import UserService from '../../services/user.js';
import { verifyToken } from '../../utils/jwt.js';

//auth Headers reqyuires authorization
export const authenticateWithToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.warn('Authorization header is missing');
    return res.status(401).json({ error: 'Authorization header is required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      console.error('Invalid token payload:', decoded);
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const user = await UserService.get(decoded.id);

    if (!user) {
      console.error(`User not found for ID: ${decoded.id}`);
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    console.error('Error during token authentication:', error.message);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};


//require Authentication before login in a user 
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};



//cant login without a required user
export const requireUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};