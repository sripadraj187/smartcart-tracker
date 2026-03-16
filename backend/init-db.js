require('dotenv').config();
const { Client, Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function createDBAndSchema() {
  // 1. Connect to default 'postgres' database to create 'smartcart'
  const client = new Client({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/postgres'
  });
  
  try {
    await client.connect();
    await client.query('CREATE DATABASE smartcart');
    console.log('Database "smartcart" created successfully.');
  } catch(e) {
    if (e.code === '42P04') {
      console.log('Database "smartcart" already exists.');
    } else {
      console.log('Notice during DB creation:', e.message);
    }
  } finally {
    await client.end();
  }
  
  // 2. Connect to the 'smartcart' database to run schema
  const pool = new Pool({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/smartcart'
  });

  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf-8');
    await pool.query(schemaSql);
    console.log('Schema objects created successfully.');
  } catch(e) {
    console.log('Error creating schema:', e.message);
  } finally {
    await pool.end();
  }
}

createDBAndSchema();
