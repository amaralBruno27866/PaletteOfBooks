import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pool from './bookBD.js';
import bodyParser from 'body-parser';
import { Parser } from 'json2csv';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const port = 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('API is up and running');
});

// Get all books (Read)
app.get('/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory.book');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Search books by title, author, or genre
app.get('/books/search', async (req, res) => {
  const { query } = req.query;
  try {
    const searchQuery = `
      SELECT * FROM inventory.book
      WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1
    `;
    const result = await pool.query(searchQuery, [`%${query}%`]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search books' });
  }
});

// Add a new book (Create)
app.post('/books', async (req, res) => {
  const { title, author, genre, publication_date, isbn } = req.body;
  try {
    const insertQuery = `
      INSERT INTO inventory.book (title, author, genre, publication_date, isbn) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, author, genre, publication_date, isbn];
    const result = await pool.query(insertQuery, values);

    // Emitir um evento para os clientes conectados quando um novo livro é adicionado
    io.emit('bookAdded', result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// Edit a book (Update)
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publication_date, isbn } = req.body;
  try {
    const updateQuery = `
      UPDATE inventory.book 
      SET title = $1, author = $2, genre = $3, publication_date = $4, isbn = $5 
      WHERE id = $6 RETURNING *`;
    const values = [title, author, genre, publication_date, isbn, id];
    const result = await pool.query(updateQuery, values);
    if (result.rows.length > 0) {
      // Emitir um evento para os clientes conectados quando um livro é atualizado
      io.emit('bookUpdated', result.rows[0]);

      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Delete a book (Delete)
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteQuery = 'DELETE FROM inventory.book WHERE id = $1 RETURNING *';
    const result = await pool.query(deleteQuery, [id]);
    if (result.rows.length > 0) {
      // Emitir um evento para os clientes conectados quando um livro é deletado
      io.emit('bookDeleted', id);

      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Export books in JSON format
app.get('/books/export/json', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory.book');
    const formattedJson = JSON.stringify(result.rows, null, 2); // Format JSON with 2 spaces indentation
    res.header('Content-Type', 'application/json');
    res.attachment('books.json');
    res.send(formattedJson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to export books in JSON format' });
  }
});

// Export books in CSV format
app.get('/books/export/csv', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory.book');
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(result.rows);
    res.header('Content-Type', 'text/csv');
    res.attachment('books.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to export books in CSV format' });
  }
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
