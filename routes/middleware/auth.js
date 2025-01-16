import UserService from '../../services/user.js';
import { verifyToken } from '../../utils/jwt.js';


 export const authenticateWithToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization header:", authHeader); // Log the header to see if it’s being passed

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('Authorization header is missing or improperly formatted');
    return res.status(401).json({ error: 'Authorization token is required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    console.log("Decoded token:", decoded); // Log the decoded token

    if (!decoded || !decoded.id) {
      console.error('Invalid or malformed token payload:', decoded);
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const user = await UserService.get(decoded.id);

    if (!user) {
      console.error(`User not found for ID: ${decoded.id}`);
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach authenticated user to the request
    next();
  } catch (error) {
    console.error('Error during token authentication:', error.message);
    return res.status(500).json({ error: 'Token authentication failed' });
  }
};



// Role-Based Authorization Middleware
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      console.warn(`Access denied. Required roles: ${roles}. User role: ${req.user.role}`);
      return res.status(403).json({ error: 'Access Denied' });
    }

    next();
  };
};

// Require Authentication Middleware (General)
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    console.warn('Access attempt without authentication');
    return res.status(401).json({ error: 'Authentication required' });
  }

  next();
};
