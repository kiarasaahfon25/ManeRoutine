/* Dev Notes 
Line: res.status(500).json({ error: error.message });
400 - based on client input/ bad request
500 - based on server/backend errors
*/
const favoriteService = require('../services/favouriteService');

const addFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const response = await favoriteService.addFavorite(userId, productId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const response = await favoriteService.removeFavorite(userId, productId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const favorites = await favoriteService.getFavorites(userId);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
