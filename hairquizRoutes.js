const express = require('express');
const router = express.Router();
const hairQuizController = require('../controllers/hairQuizController'); // Import the entire controller

// Save quiz 
router.post('/savequiz', hairQuizController.saveQuiz);

// Get quiz results 
router.get('/:quizuserId', hairQuizController.getQuiz);

//get hair quiz questions
router.get('/quizquestions', hairQuizController.getQuizQuestions);


module.exports = router;
