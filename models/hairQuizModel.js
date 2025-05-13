const pool = require('../config/db');

class HairQuizModel {

    static async saveQuizData(quizData) {
        const { userId, hairType, porosity, scalpType, hairThickness, hairGoals, washFrequency, productsUsed, heatStylingFrequency, timeSpentOnRoutine, protectiveStyles, protectiveStylesDuration, elasticity } = quizData;
        
        const query = `INSERT INTO user_quiz (user_id, hair_type, porosity, scalp_type, hair_thickness, hair_goals, wash_frequency, products_used, heat_styling_frequency, time_spent_on_routine, protective_styles, protective_styles_duration, elasticity) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`; 

        const result = await pool.query(
            query,
            [userId, hairType, porosity, scalpType, hairThickness, hairGoals, washFrequency, productsUsed, heatStylingFrequency, timeSpentOnRoutine, protectiveStyles, protectiveStylesDuration, elasticity]
        );
        return result.rows[0];
    }

    static async getQuizDataByUserId(userId) {
        const query = 'SELECT * FROM user_quiz WHERE user_id = $1'
        const result = await pool.query(query, [userId]);
        return result.rows;
    }

    static async getQuizQuestions(){ 
        const questionsRes = await db.query('SELECT * FROM quiz_questions');
        const questions = questionsRes.rows;

        const questionsWithOptions = await Promise.all(
            questions.map(async (q) => {
              const optionsRes = await db.query(
                'SELECT option_text FROM quiz_options WHERE question_id = $1',
                [q.id]
              );
      
        
              return {
                id: q.id,
                question_key: q.questson_key,
                question_text: q.question_text,
                isMultiselect: q.is_multiselect,
                parentQuestion: parent_question_id,
                options: optionsRes.rows.map(o => o.option_text)
              };
            })
          );
          res.status(200).json(questionsWithOptions);
        } catch (err) {
          console.error('Error fetching quiz questions:', err);
          res.status(500).json({ status: 'error', message: 'Server error' });
        }

}

module.exports = HairQuizModel; 
