import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '56f3d0a5b018dfd95056c4a2855fba5e897a57e5066db8080ca130653876dea00f119cfe42478f013dbc637381fa2ff57564ae20e25bb16dd8fcac270430d731dde9529fafd303c49084eaad6a41cc034c4527a4c9a5a9b4b1a96a0465733d7ef7616c91e2a3fda3960960253910b89a3971ce66f80466fec4a13c3b50b9bd377b7131c5bc15f0c3940bcaf784533301ef3e9ac365ed2c85000854478e60843ea0ae1eaf746efaa83c1c7ea9310c5d3ee9a44adf809df214b7e87c6e6753f5a20af571e2787b808e8eb6c31a532b095';

export function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
}
