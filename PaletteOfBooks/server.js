/* eslint-disable no-undef */
import express from 'express';
import pool from './db.js'; // Add the .js extension
const app = express();

app.use(express.json());

// List all the books ROUTE
app.get('/books', async (req, res) => {
  try {
    const allBooks = await pool.query('SELECT * FROM inventory.book');
    res.json(allBooks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const allBooks = await pool.query('SELECT * FROM inventory.book');
    console.log('Books in inventory:', allBooks.rows);
  } catch (err) {
    console.error('Error fetching books:', err.message);
  }
});