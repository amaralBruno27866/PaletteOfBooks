/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BooksTable } from './BooksTable';
import { Card } from './Card';
import styles from '../Styles/BookView.module.css';

export function BooksView() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className={styles.container}>
      <BooksTable onSelectBook={setSelectedBook} />
      {selectedBook && (
        <Card
          id={selectedBook.id}
          title={selectedBook.title}
          author={selectedBook.author}
          genre={selectedBook.genre}
          publicationDate={selectedBook.publication_date}
          isbn={selectedBook.isbn}
          imageUrl={selectedBook.url}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      )}
    </div>
  );
}