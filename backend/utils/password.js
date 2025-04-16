import bcrypt from 'bcrypt';
import crypto from 'crypto';

/**
 * ✅ Hashes the password using bcrypt algorithm
 * @param {string} password - The password to hash
 * @return {string} Password hash
 */
export const generatePasswordHash = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

/**
 * ✅ Validates the password against the hash
 * @param {string} password - The password to verify
 * @param {string} hash - Password hash to verify against
 * @return {boolean} True if the password matches the hash, false otherwise
 */
export const validatePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * ✅ Checks that the hash has a valid format
 * @param {string} hash - Hash to check format for
 * @return {boolean} True if passed string seems like valid hash, false otherwise
 */
export const isPasswordHash = (hash) => {
  if (!hash || hash.length !== 60) return false;
  try {
    bcrypt.getRounds(hash);
    return true;
  } catch {
    return false;
  }
};

/**
 * ✅ Generates a secure random reset token
 * @return {string} Reset token
 */
export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * ✅ Generates a 6-digit OTP (One-Time Password)
 * @return {string} OTP code
 */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};
