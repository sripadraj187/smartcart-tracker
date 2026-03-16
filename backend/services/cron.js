const cron = require('node-cron');
const pool = require('../db');
const { scrapeProduct } = require('./scraper');
const { sendPriceDropEmail } = require('./mailer');

// Run every 6 hours: '0 */6 * * *'
// For testing/development, you might change to '*/5 * * * *' (every 5 mins)
cron.schedule('0 */6 * * *', async () => {
  console.log('Running price check cron job...');
  try {
    // Get all unique products to track
    const productsResult = await pool.query('SELECT * FROM products');
    const products = productsResult.rows;

    for (const product of products) {
      try {
        const { title, price } = await scrapeProduct(product.product_url);
        
        // Wait 3 seconds between requests to avoid rate limits
        await new Promise(r => setTimeout(r, 3000));
        
        if (price > 0 && price !== Number(product.current_price)) {
          // Record history
          await pool.query('INSERT INTO price_history (product_id, price) VALUES ($1, $2)', [product.id, price]);
          
          if (price < Number(product.current_price)) {
            // Price dropped! Send email
            const userResult = await pool.query('SELECT email FROM users WHERE id = $1', [product.user_id]);
            if (userResult.rows.length > 0) {
              const userEmail = userResult.rows[0].email;
              await sendPriceDropEmail(userEmail, title, product.current_price, price, product.product_url);
            }
          }
          
          // Update current price
          await pool.query('UPDATE products SET current_price = $1, product_title = $2 WHERE id = $3', [price, title, product.id]);
        }
      } catch (err) {
        console.error(`Failed to check price for ${product.product_url}`, err.message);
      }
    }
  } catch (err) {
    console.error('Cron job failed', err);
  }
  console.log('Cron job finished.');
});

console.log('Cron jobs initialized');
