// /models/productModel.js
const pool = require('../config/db');

class ProductModel {
    // Get products based on hair type and porosity
    async getProductsByHairTypeAndPorosity(hairType, porosity) {
        const query = 'SELECT * FROM products WHERE $1 = ANY(hair_types) AND $2 = ANY(porosities)';
        const result = await pool.query(query, [hairType, porosity]);
        return result.rows;
    }

    // Get products based on hair goals, type, and porosity
    async getProductsByGoalHairTypeAndPorosity(goal, hairType, porosity) {
        const query = 'SELECT * FROM products WHERE category @> $1 AND $2 = ANY(hair_types) AND $3 = ANY(porosities)';
        const result = await pool.query(query, [[goal], hairType, porosity]);
        return result.rows;
    }

    // Get product by ID
    async getProductById(id) {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('Product not found');
        }
        return result.rows[0];
    }
}

module.exports = new ProductModel();
