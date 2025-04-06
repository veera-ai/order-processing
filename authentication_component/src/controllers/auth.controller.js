/**
 * Authentication controller
 */
import { generateToken } from '../config/jwt.js';
import User from '../models/user.model.js';
import logger from '../config/logger.js';

// PUBLIC_INTERFACE
/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      verificationToken: Math.random().toString(36).substring(2, 15)
    });

    // Generate token
    const token = generateToken({ userId: user._id });

    logger.logSecurityEvent('USER_REGISTERED', user._id, { email });

    res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error registering user'
    });
  }
};

// PUBLIC_INTERFACE
/**
 * Login user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (user.isLocked()) {
      logger.logSecurityEvent('LOGIN_ATTEMPT_LOCKED', user._id, { email });
      return res.status(401).json({
        success: false,
        message: 'Account is locked. Try again later'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.incrementLoginAttempts();
      logger.logSecurityEvent('LOGIN_FAILURE', user._id, { email });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    await User.findByIdAndUpdate(user._id, {
      $set: { loginAttempts: 0, lastLogin: new Date() },
      $unset: { lockUntil: 1 }
    });

    // Generate token
    const token = generateToken({ userId: user._id });

    logger.logSecurityEvent('LOGIN_SUCCESS', user._id, { email });

    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error logging in'
    });
  }
};

// PUBLIC_INTERFACE
/**
 * Verify email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification token'
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    logger.logSecurityEvent('EMAIL_VERIFIED', user._id, { email: user.email });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    logger.error(`Email verification error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error verifying email'
    });
  }
};

// PUBLIC_INTERFACE
/**
 * Request password reset
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate reset token
    const resetToken = Math.random().toString(36).substring(2, 15);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    logger.logSecurityEvent('PASSWORD_RESET_REQUESTED', user._id, { email });

    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    logger.error(`Password reset request error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error requesting password reset'
    });
  }
};

// PUBLIC_INTERFACE
/**
 * Reset password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    logger.logSecurityEvent('PASSWORD_RESET_COMPLETED', user._id, { email: user.email });

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    logger.error(`Password reset error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error resetting password'
    });
  }
};

export {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword
};
