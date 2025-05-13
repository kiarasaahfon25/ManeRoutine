// /services/hairQuizService.js
const pool = require('../config/db');
const HairQuizModel = require('../models/hairQuizModel'); // Interacts with database

class HairQuizService {
    // Save quiz results to the database
    async saveQuizResult(userId, quizData) {
        try {
            await HairQuizModel.saveQuizData(userId,quizData)
            return { message: 'Quiz Saved' };
        } catch (error) {
            throw new Error('Database error, could not save quiz');
        }
    }
      

    // Get quiz data by userId
    async getQuizData(userId) {
        try {
            await HairQuizModel.getQuizDataByUserId(userId); 
            return { message: 'Recieved Quiz Data by User Id' };
        } catch (error) {
            throw new Error('Database error, could not recieve quiz data');
        }
    }

    async getQuizQuestions(){
        try{ 
        const questions = await HairQuizModel.getQuizQuestions();

        const questionsWithOptions = await Promise.all(
            questions.map(async (q) => {
              const options = await HairQuizModel.getOptionsByQuestionId(q.id);
              return {
                id: q.id,
                question_key: q.question_key,
                question_text: q.question_text,
                isMultiselect: q.is_multiselect,
                parentQuestion: parent_question_id,
                options: options,
              };
            })
          );
        return questionsWithOptions;
        } catch (error){ 
            throw new Error
        }
    };
}
module.exports = new HairQuizService();
