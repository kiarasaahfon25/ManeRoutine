// /services/productService.js
const productModel = require('../models/productModel');

class ProductService {
    // Recommend products based on hair type, porosity, and hair goals
    async recommendProducts(hairType, porosity, hairGoals) {
        try {
            let recommendedProducts = [];

            // Step 1: Get products for the user's hair type and porosity
            const productsByTypeAndPorosity = await productModel.getProductsByHairTypeAndPorosity(hairType, porosity);
            recommendedProducts.push(...productsByTypeAndPorosity);

            // Step 2: Get products based on the user's hair goals (hydration, volume, etc.)
            for (let goal of hairGoals) {
                const productsByGoal = await productModel.getProductsByGoalHairTypeAndPorosity(goal, hairType, porosity);
                recommendedProducts.push(...productsByGoal); // Add to the list
            }

            // Step 3: Remove duplicates by product ID to ensure no repetitions
            recommendedProducts = this.removeDuplicates(recommendedProducts)

            return recommendedProducts;
        } catch (err) {
            throw new Error(`Error recommending products: ${err.message}`);
        }
    }

    // Get product details by ID
    async getProductById(id) {
        try {
            const product = await productModel.getProductById(id);
            return product;
        } catch (err) {
            throw new Error(`Error fetching product details: ${err.message}`);
        }
    }

    // Utility function to remove duplicates based on product ID
    removeDuplicates(products) {
        // Remove duplicates by comparing the product IDs
        return [...new Set(products.map(product => product.id))]
            .map(id => products.find(product => product.id === id));
    }
}

module.exports = new ProductService();
