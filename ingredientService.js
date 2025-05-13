// /services/ingredientService.js
const pool = require('../config/db');
const IngredientModel = require('../models/ingredientModel'); // Interacts with the database

class IngredientService {
    // Recommend ingredients based on hair type and porosity
    async recommendIngredients(hairType, porosity) {
        try {
            const query = `
                SELECT * FROM ingredients 
                WHERE $1 = ANY(hair_types) AND $2 = ANY(porosities)
            `;

            const result = await pool.query(query, [hairType, porosity]);

            if (result.rows.length > 0) {
                return result.rows;
            } else {
                throw new Error("No recommended ingredients found");
            }
        } catch (err) {
            throw new Error('Error recommending ingredients: ' + err.message);
        }
    }

    // Get products that contain a specific ingredient
    async getProductsByIngredient(ingredientName) {
        try {
            const query = `
                SELECT p.* FROM products p
                JOIN product_ingredients pi ON p.id = pi.product_id
                JOIN ingredients i ON pi.ingredient_id = i.id
                WHERE i.name = $1
            `;

            const result = await pool.query(query, [ingredientName]);

            if (result.rows.length > 0) {
                return result.rows;
            } else {
                throw new Error("No products found with this ingredient");
            }
        } catch (err) {
            throw new Error('Error fetching products by ingredient: ' + err.message);
        }
    }
}

module.exports = new IngredientService();
