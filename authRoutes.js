const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/signup', authController.register);

// Login route
router.post('/login', authController.login);

module.exports = router;
