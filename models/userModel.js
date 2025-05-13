const pool = require('../config/db'); // Database connection

class UserModel {
    static async getUserByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0]; 
    }

    static async createUser(name, email, password) {
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, name, email',
            [name, email, password]
        );
        return result.rows[0]; // Return the created user
    }
}

module.exports = UserModel;
