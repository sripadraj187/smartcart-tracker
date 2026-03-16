const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  // Launch browser
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    // Simulate real user
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    let title = 'Unknown Product';
    let priceString = '0';
    let image = '';

    if (url.includes('amazon.')) {
      title = await page.$eval('#productTitle', el => el.innerText.trim()).catch(() => 'Amazon Product');
      priceString = await page.$eval('.a-price .a-offscreen', el => el.innerText.trim()).catch(() => '0');
      image = await page.$eval('#landingImage', el => el.src).catch(() => '');
    } else if (url.includes('flipkart.')) {
      title = await page.$eval('.B_NuCI, .VU-Tz5', el => el.innerText.trim()).catch(() => 'Flipkart Product');
      priceString = await page.$eval('._30jeq3.16Jk6d, .Nx9bqj.CxhGGd', el => el.innerText.trim()).catch(() => '0');
      image = await page.$eval('._396cs4, .vU5WPQ', el => el.src).catch(() => '');
    }
    
    // Clean price string to get a valid number
    const price = parseFloat(priceString.replace(/[^0-9.]/g, '')) || 0;

    return { title, price, image };
  } catch (error) {
    console.error('Scraping failed:', error.message);
    throw new Error('Failed to scrape product');
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeProduct };
