const { Pool } = require('pg');

// Use DATABASE_URL if available (Render), otherwise use local config
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:mypassword@localhost:5432/todoapp';

const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database.');

  // Create Table
  client.query(`CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err, result) => {
    release();
    if (err) {
      return console.error('Error creating table', err.stack);
    }
  });
});

module.exports = pool;
