const { Pool } = require('pg');

// Use DATABASE_URL from environment variables (local .env or Render env)
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is missing. Please check your .env file or Render environment variables.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
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
