/**
 * Email utility functions
 */
import nodemailer from 'nodemailer';
import logger from '../config/logger.js';

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// PUBLIC_INTERFACE
/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} [options.html] - HTML content
 * @returns {Promise<boolean>} Success status
 */
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${options.to}`);
    return true;
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    return false;
  }
};

// PUBLIC_INTERFACE
/**
 * Send verification email
 * @param {string} email - Recipient email
 * @param {string} token - Verification token
 * @returns {Promise<boolean>} Success status
 */
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  return sendEmail({
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
    html: `
      <div>
        <h1>Email Verification</h1>
        <p>Please verify your email by clicking on the following link:</p>
        <a href="${verificationUrl}">Verify Email</a>
      </div>
    `
  });
};

// PUBLIC_INTERFACE
/**
 * Send password reset email
 * @param {string} email - Recipient email
 * @param {string} token - Password reset token
 * @returns {Promise<boolean>} Success status
 */
const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  return sendEmail({
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}. If you didn't request this, please ignore this email.`,
    html: `
      <div>
        <h1>Password Reset</h1>
        <p>You requested a password reset. Please click on the following link to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `
  });
};

export {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail
};
