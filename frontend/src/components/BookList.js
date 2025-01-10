import React, { useEffect, useState } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    return (
        <div>
            <h2>Your Books</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author} ({book.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
