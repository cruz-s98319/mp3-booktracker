import React, { useState } from "react";

const AddBookForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        published_date: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send book data to the backend
        fetch("http://localhost:5000/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message || "Book added successfully!");
                setFormData({ title: "", author: "", genre: "", published_date: "" });
            })
            .catch((err) => console.error("Error adding book:", err));        
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Published Date:</label>
                    <input
                        type="date"
                        name="published_date"
                        value={formData.published_date}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookForm;
