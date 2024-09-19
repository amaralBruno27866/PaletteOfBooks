/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pool from './bookDB.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Middleware to log request
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// ROUTE List all the books
app.get('/books', async(req, res) => {
  try{
    const allBooks = await pool.query('SELECT * FROM inventory.books');
    console.log('Feched all books');
    res.json(allBooks.rows);
  } catch(err){
    console.error('Error fetching all books: ', err.stack);
    res.status(500).json({error: err.stack});
  }
});

// ROUTE Get a single book by id
app.get('/books/:id', async(req, res) =>{
  const { id } = req.params;

  // Validate the id parameter
  if (isNaN(id)) {
    console.log('Invalid book ID:', id);
    return res.status(400).send('Invalid book ID');
  }

  try {
    const book = await pool.query('SELECT * FROM inventory.book WHERE id = $1', [parseInt(id)]);
    if (book.rows.length === 0) {
      console.log('Book not found:', id);
      return res.status(404).send('Book not found');
    }
    console.log('Fetched book:', id);
    res.json(book.rows[0]);
  } catch (err) {
    console.error('Error fetching book:', err.message);
    res.status(500).send('Server Error');
  }
});

// ROUTE Create a new book
app.post('/books', async (req, res) => {
  const { title, author, genre, publication_date, isbn, url } = req.body;

  // Validate request body
  if (!title || !author || !genre || !publication_date || !isbn || !url) {
    console.log('Missing fields in request body');
    return res.status(400).send('All fields are required');
  }

  try {
    const newBook = await pool.query(
      'INSERT INTO inventory.book (title, author, genre, publication_date, isbn, url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, author, genre, publication_date, isbn, url]
    );
    console.log('Created new book:', newBook.rows[0].id);
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error('Error creating book:', err.message);
    res.status(500).send('Server Error');
  }
});

// ROUTE Update a book by ID
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publication_date, isbn, url } = req.body;

  // Validate the id parameter
  if (isNaN(id)) {
    console.log('Invalid book ID:', id);
    return res.status(400).send('Invalid book ID');
  }

  // Validate request body
  if (!title || !author || !genre || !publication_date || !isbn || !url) {
    console.log('Missing fields in request body');
    return res.status(400).send('All fields are required');
  }

  try {
    const updatedBook = await pool.query(
      'UPDATE inventory.book SET title = $1, author = $2, genre = $3, publication_date = $4, isbn = $5, url = $6 WHERE id = $7 RETURNING *',
      [title, author, genre, publication_date, isbn, url, parseInt(id)]
    );
    if (updatedBook.rows.length === 0) {
      console.log('Book not found:', id);
      return res.status(404).send('Book not found');
    }
    console.log('Updated book:', id);
    res.json(updatedBook.rows[0]);
  } catch (err) {
    console.error('Error updating book:', err.message);
    res.status(500).send('Server Error');
  }
});

// ROUTE Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the id parameter
  if (isNaN(id)) {
    console.log('Invalid book ID:', id);
    return res.status(400).send('Invalid book ID');
  }

  try {
    const deletedBook = await pool.query('DELETE FROM inventory.book WHERE id = $1 RETURNING *', [parseInt(id)]);
    if (deletedBook.rows.length === 0) {
      console.log('Book not found:', id);
      return res.status(404).send('Book not found');
    }
    console.log('Deleted book:', id);
    res.json(deletedBook.rows[0]);
  } catch (err) {
    console.error('Error deleting book:', err.message);
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

// Test database connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
  }
}

testConnection();