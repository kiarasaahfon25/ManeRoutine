const productService = require('../services/productService');

const recommendProducts = async (req, res) => {
    const { userId, hairType, porosity, hairGoals } = req.body;

    try {
        const products = await productService.recommendProducts(userId, hairType, porosity, hairGoals);
        res.json(products); // Return recommended products
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productService.getProductById(id);
        if (product) {
            res.json(product); // Return specific product details
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { recommendProducts, getProductById };
