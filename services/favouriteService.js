// /services/favoriteService.js
const pool = require('../config/db');
const FavoriteModel = require('../models/favouriteModel');

class FavoriteService {
    // Add product to favorites
    async addFavorite(userId, productId) {
        try {
            await FavoriteModel.addFavorite(userId, productId);
            return { message: 'Product added to favorites' };
        } catch (error) {
            throw new Error('Database error, could not add product to favorites');
        }
    }

    // Remove product from favorites
    async removeFavorite(userId, productId) {
        try {
            await FavoriteModel.removeFavorite(userId, productId);
            return { message: 'Product removed from favorites' };
        } catch (error) {
            throw new Error('Database error, could not remove product from favorites');
        }
    }

    // Display all favorites for a user
    async getFavorites(userId) {
        try {
            const favorites = await FavoriteModel.getFavoritesByUserId(userId);
            return favorites;
        } catch (error) {
            throw new Error('Database error, could not fetch favorites');
        }
    }
}

module.exports = new FavoriteService();
