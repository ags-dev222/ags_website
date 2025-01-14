import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  const payload = { userId: user._id }; 
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use your secret key
  return token;
};


export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the secret
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};