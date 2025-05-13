const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const userService = require('./userService');

class AuthService {
    async registerUser(name, email, password) {
    // Validate email
    if (!this.isValidEmail(email)) {
        throw new Error('Invalid email format');
    }

    // Validate password
    if (!this.isValidPassword(password)) {
        throw new Error('Password must be at least 8 characters long, include a letter, a number, and a special character');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    return await userService.createUser(name, email, hashedPassword);
}

    async  login(email, password) {
    // 1. Check if user exists in DB
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
  
    // 2. Check if password matches hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
  
    // 3. Return safe user data (omit password)
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      // add more fields as needed, but never include password
    };
  }

   

isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);

    /* 
    starts with non space 
    contains an @ seperating the local part from the domain
    has a domain part that doesn't contain spaces or @ 
    ends with a dot followed by a tld
    */
}

isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
    /* 
    at least 1 letter 
    1 digit 
    1 special character 
    at least 8 characters long
    */
}
}

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const token = await authService.generatePasswordResetToken(email);
        if (!token) {
            return res.status(404).json({ message: 'User not found' });
        }

        await authService.sendPasswordResetEmail(email, token);
        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Error processing password reset request' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await authService.verifyPasswordResetToken(token);
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await userService.updatePassword(user.id, newPassword);
        res.json({ message: 'Password successfully reset' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting password' });
    }
};

module.exports = { requestPasswordReset, resetPassword };


module.exports = new AuthService();
