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

    // Query the inventory.book table to retrieve data
    client.query('SELECT * FROM inventory.book', (err, res) => {
      if (!err) {
        console.log('Books in inventory:', res.rows);
      } else {
        console.log('Error running query:', err.message);
      }
      client.end();
    });
  }
});