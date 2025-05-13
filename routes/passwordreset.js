const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db, sendResetEmail } = require('./utils');  // to be figured out later
const router = express.Router();

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    // Check if email exists in the database
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!user) return res.status(404).json({ message: 'Email not found' });
  
    // Generate reset token
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    // Send reset link via email
    const resetLink = `https://yourapp.com/reset-password?token=${resetToken}`;
    sendResetEmail(user.email, resetLink); // Assume sendResetEmail is a helper function //MUST ADD
  
    res.status(200).json({ message: 'Reset link sent to your email.' });
  });
  
  // Reset Password Route
  router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password in the database
      await db.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, decoded.email]);
  
      res.status(200).json({ message: 'Password reset successfully.' });
    } catch (err) {
      res.status(400).json({ message: 'Invalid or expired token.' });
    }
  });
  
  module.exports = router;