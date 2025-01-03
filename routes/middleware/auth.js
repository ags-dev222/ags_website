import UserService from '../../services/user.js';

export const authenticateWithToken = (req, res, next) => {
  // Get the token from the session (not the Authorization header)
  const token = req.session.token;

  if (token) {
    UserService.authenticateWithToken(token)
      .then((user) => {
        req.user = user;  // Attach the user to the request object
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    // If there's no token in the session, move to the next middleware
    next();
  }
};

export const requireUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  next();
};
