const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel'); // Assume you have a user model for DB operations

// Create a new user (registration)
async function createUser(name, email, password) {
    // Check if a user with the same email already exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' }); // Prevent duplicate email registration
        
        // Change all the error messages to use these situations
    }
    
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user in the database
    const newUser = await userModel.createUser(name, email, hashedPassword);
    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
    };
}

// Login an existing user (authentication)
async function loginUser(email, password) {
    // Fetch the user from the database by email
    const user = await userModel.getUserByEmail(email);
    if (!user) throw new Error('User not found'); // If user is not found, throw an error

    // Compare the provided password with the stored hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid credentials'); // If password doesn't match, throw an error

    // Generate a JWT token if the credentials are valid
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET, // Secret key stored in environment variables
        { expiresIn: '1h' } // Set token expiration to 1 hour
    );

    // Return the token and a minimal user profile
    return { 
        token, 
        user: { id: user.id, name: user.name, email: user.email } 
    };
}

module.exports = { createUser, loginUser };

