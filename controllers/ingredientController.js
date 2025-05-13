const ingredientService = require('../services/ingredientService');

const recommendIngredients = async (req, res) => {
    const { hairType, porosity } = req.body;

    try {
        const ingredients = await ingredientService.recommendIngredients(hairType, porosity);
        res.json(ingredients); // Return matching ingredients
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProductsByIngredient = async (req, res) => {
    const { ingredientName } = req.params;

    try {
        const products = await ingredientService.getProductsByIngredient(ingredientName);
        res.json(products); // Return matching products
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { recommendIngredients, getProductsByIngredient };

