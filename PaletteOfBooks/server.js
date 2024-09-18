/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors'; // Import the cors package
import pool from './db.js'; // Add the .js extension

const app = express();

app.use(cors()); // Use the cors middleware
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

// Get a single book by ID ROUTE
app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await pool.query('SELECT * FROM inventory.book WHERE id = $1', [id]);
    if (book.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(book.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new book ROUTE
app.post('/books', async (req, res) => {
  const { title, author, genre, publication_date, isbn, image_url } = req.body;
  try {
    const newBook = await pool.query(
      'INSERT INTO inventory.book (title, author, genre, publication_date, isbn, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, author, genre, publication_date, isbn, image_url]
    );
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a book by ID ROUTE
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publication_date, isbn, image_url } = req.body;
  try {
    const updatedBook = await pool.query(
      'UPDATE inventory.book SET title = $1, author = $2, genre = $3, publication_date = $4, isbn = $5, image_url = $6 WHERE id = $7 RETURNING *',
      [title, author, genre, publication_date, isbn, image_url, id]
    );
    if (updatedBook.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(updatedBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a book by ID ROUTE
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the id parameter
  if (isNaN(id)) {
    return res.status(400).send('Invalid book ID');
  }

  try {
    const deletedBook = await pool.query('DELETE FROM inventory.book WHERE id = $1 RETURNING *', [parseInt(id)]);
    if (deletedBook.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(deletedBook.rows[0]);
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