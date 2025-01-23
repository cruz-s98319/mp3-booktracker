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

import React, { useEffect, useState } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/books');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data); // Update state with fetched books
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array to run only on component mount

  // Render books in a table
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
