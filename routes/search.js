const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/search', async (req, res) => {
    const { query } = req.query; // Get search term from query parameters

    if (!query) {
        return res.status(400).json({ error: "Search query is required" });
    }

    try {
        const searchQuery = `
            SELECT * FROM products 
            WHERE LOWER(brand) LIKE LOWER($1) 
               OR LOWER(name) LIKE LOWER($1) 
               OR LOWER(type) LIKE LOWER($1)
        `;

        const result = await pool.query(searchQuery, [`%${query}%`]);

        if (result.rows.length === 0) {
            return res.json({ message: "No matching products found" });
        }

        res.json(result.rows); // Send matching products
    } catch (err) {
        res.status(500).json({ error: "Database error, could not get seach results" });
    }
});

module.exports = router;