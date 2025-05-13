const hairQuizService = require('../services/hairQuizService');
/* 
        line: const { userId, ...quizData } = req.body;
        - seperating the userId from the rest of the quiz data

*/

const saveQuiz = async (req, res) => {
    try {
        const { userId, ...quizData } = req.body;
        const response = await hairQuizService.saveQuizResult(userId, quizData);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQuiz = async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await hairQuizService.getQuizData(userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getQuizQuestions = async (req, res) => {
  try {
    const quiz = await hairQuizService.getQuizQuestions();
    res.status(200).json(quiz);
  } catch (err) {
    console.error('Error fetching quiz questions:', err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};



module.exports = { saveQuiz, getQuiz, getQuizQuestions, };
