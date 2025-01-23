// import React, { useEffect, useState } from 'react';

// const BookList = () => {
//     const [books, setBooks] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:5000/books')
//             .then(res => res.json())
//             .then(data => setBooks(data));
//     }, []);

//     return (
//         <div>
//             <h2>Your Books</h2>
//             <ul>
//                 {books.map(book => (
//                     <li key={book.id}>
//                         {book.title} by {book.author} ({book.status})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default BookList;

import React, { useState, useEffect } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then(() => {
        fetchBooks(); // Refresh book list
        setNewBook({ title: "", author: "" }); // Clear form
      });
  };

  const toggleStatus = (bookId, currentStatus) => {
    const newStatus = currentStatus === "Reading" ? "Complete" : "Reading";
    fetch(`http://localhost:5000/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    }).then(() => fetchBooks()); // Refresh book list
  };

  return (
    <div>
      <h1>Book Tracker</h1>

      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Book Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <button type="submit">Add Book</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.status}</td>
              <td>
                <button onClick={() => toggleStatus(book.id, book.status)}>
                  Mark as {book.status === "Reading" ? "Complete" : "Reading"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
