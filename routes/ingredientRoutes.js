const express = require('express');
const ingredientController = require('../controllers/ingredientController');
const router = express.Router();

// Recommend ingredients based on hair type and porosity
router.post('/recommend-ingredients', ingredientController.recommendIngredients);

// Get products by ingredient
router.get('/products-by-ingredient/:ingredientName', ingredientController.getProductsByIngredient);

module.exports = router;
