import UserService from '../../services/user.js';
import { verifyToken } from '../../utils/jwt.js';

export const authenticateWithToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      const user = await UserService.get(decoded.id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(new Error('User not found'));
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    next();
  }
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

export const requireUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};