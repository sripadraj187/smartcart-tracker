const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');
const { scrapeProduct } = require('../services/scraper');

// Get all products for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Add a new product URL to track
router.post('/add', auth, async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    // 1. Scrape product data
    const { title, price, image } = await scrapeProduct(url);

    // 2. Insert into products
    const productResult = await pool.query(
      'INSERT INTO products (user_id, product_title, product_url, current_price, product_image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, title, url, price, image]
    );

    const product = productResult.rows[0];

    // 3. Insert initial price history
    await pool.query(
      'INSERT INTO price_history (product_id, price) VALUES ($1, $2)',
      [product.id, price]
    );

    res.status(201).json({ product });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Product is already being tracked' });
    res.status(500).json({ error: 'Failed to add product', details: err.message });
  }
});

// Delete a tracked product
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING id', [req.params.id, req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get price history for a product
router.get('/:id/history', auth, async (req, res) => {
  try {
    // Verify ownership
    const prodResult = await pool.query('SELECT id FROM products WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    if (prodResult.rows.length === 0) return res.status(404).json({ error: 'Product not found' });

    const history = await pool.query('SELECT price, checked_at FROM price_history WHERE product_id = $1 ORDER BY checked_at ASC', [req.params.id]);
    res.json(history.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
