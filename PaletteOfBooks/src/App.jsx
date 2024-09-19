import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { MainContainer } from './components/MainContainer';
import { Footer } from './components/Footer';
import styles from './App.module.css';
import './global.css';

export function App() {
  const [books, setBooks] = useState([]);
  const [setSelectedBook] = useState(null);

  useEffect(() => {
    // Fetch books data from the backend
    axios.get('http://localhost:5000/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className={styles.app}>
      <Header />
      <Navbar onAddBook={handleAddBook} books={books} />
      <MainContainer books={books} onSelectBook={setSelectedBook} />
      <Footer />
      <div className={styles.copyright}>
        Copyright &copy; 2024 BeagleProg. All Rights Reserved. Made by Bruno Amaral
      </div>
    </div>
  );
}