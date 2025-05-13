/* Dev notes 
       line: res.status(201).json({ message: 'User created', user: newUser }); 
       http responses back to client letting them know user has been created
       201 http status code indicates ressource creation
       
       await: waits for the code to finish executing before moving on to the next line
    
       line: res.status(400).json({ error: error.message });
       400 http code indicates bad request
       

*/

const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await authService.registerUser(name, email, password);
        res.status(201).json({ message: 'User created', user: newUser });
        //await emailService.sendWelcomeEmail(email, name);

    } catch (error) {    
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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

module.exports = { register, login,requestPasswordReset, resetPassword };

