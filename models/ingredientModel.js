const pool = require('../config/db');

class IngredientModel {
    
    static async recommendIngredients(hairType, porosity) { //by hairtype and porosity
        const query = `
            SELECT * FROM ingredients 
            WHERE $1 = ANY(hair_types) AND $2 = ANY(porosities)
        `;
        const result = await pool.query(query, [hairType, porosity]);
        return result.rows;
    }

    async getProductsByIngredient(ingredientName) {
        const query = `
            SELECT p.* FROM products p
            JOIN product_ingredients pi ON p.id = pi.product_id
            JOIN ingredients i ON pi.ingredient_id = i.id
            WHERE i.name = $1
        `;
        const result = await pool.query(query, [ingredientName]);
        return result.rows;
    }
}

module.exports = IngredientModel;
