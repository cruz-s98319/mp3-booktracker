import React, { useEffect, useState } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchBooks(); 
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books found. Add a book to get started!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.status}</td>
                <td>
                  {book.status === 'Reading' ? (
                    <button onClick={() => updateStatus(book.id, 'Complete')}>Mark as Complete</button>
                  ) : (
                    <button onClick={() => updateStatus(book.id, 'Reading')}>Mark as Reading</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
