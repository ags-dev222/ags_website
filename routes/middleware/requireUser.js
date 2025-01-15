

export default function requireUser(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized access. User is not authenticated.' });
    }
    next();
  }
  