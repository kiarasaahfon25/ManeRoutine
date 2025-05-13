const pool = require('../config/db');

class FavoriteModel {
    static async addFavorite(userId, productId) {
        const result = await pool.query(
            'INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [userId, productId]
        );
        return result;
    }

    static async removeFavorite(userId, productId) {
        const result = await pool.query(
            'DELETE FROM favorites WHERE user_id = $1 AND product_id = $2',
            [userId, productId]
        );
        return result;
    }

    static async getFavoritesByUserId(userId) {
        const result = await pool.query(
            'SELECT * FROM favorites WHERE user_id = $1',
            [userId]
        );
        return result.rows;
    }
}

module.exports = FavoriteModel;
