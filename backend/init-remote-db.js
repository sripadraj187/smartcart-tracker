require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function createSchema() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf-8');
    await pool.query(schemaSql);
    console.log('Schema objects created successfully on remote database.');
  } catch(e) {
    console.log('Error creating schema:', e.message);
  } finally {
    await pool.end();
  }
}

createSchema();
