import React from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';

function App() {
  return (
    <div>
      <h1>Book Tracker</h1>
      <AddBookForm />
      <BookList />
    </div>
  );
}

export default App;