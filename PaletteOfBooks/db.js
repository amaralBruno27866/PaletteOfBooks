/* eslint-disable no-undef */
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');

    // Run a simple query to verify the connection
    client.query('SELECT NOW()', (err, res) => {
      if (!err) {
        console.log('Current time:', res.rows[0]);
      } else {
        console.log('Error running query:', err.message);
      }
      client.end();
    });
  }
});