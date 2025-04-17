import { verifyToken } from "../../utils/jwt.js";

const requireUser = (req, res, next) => {
  const token = req.session?.token || req.headers.authorization?.split(' ')[1]; // From session or header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, please login' });
  }

  try {
    const decoded = verifyToken(token); 
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default requireUser;