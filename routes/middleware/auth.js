import UserService from '../../services/userService.js';
import { verifyToken } from '../../utils/jwt.js';
import logger from '../../utils/log.js';

export const authenticateWithToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  logger.info('Authorization header:', authHeader); // Use logger here

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn('Authorization header is missing or improperly formatted');
    return res.status(401).json({ error: 'Authorization token is required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    logger.info('Decoded token:', decoded);

    if (!decoded || !decoded.id) {
      logger.error('Invalid or malformed token payload:', decoded);
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const user = await UserService.get(decoded.id);

    if (!user) {
      logger.error(`User not found for ID: ${decoded.id}`);
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Error during token authentication:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role.toLowerCase();
    const normalizedRoles = roles.map(role => role.toLowerCase());

    if (!normalizedRoles.includes(userRole)) {
      return res.status(403).json({
        error: `Access denied. Required roles: ${roles.join(', ')}`,
      });
    }
    next();
  };
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    logger.warn('Access attempt without authentication');
    return res.status(401).json({ error: 'Authentication required' });
  }

  next();
};