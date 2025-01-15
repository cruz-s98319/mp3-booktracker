import React, { useState } from "react";

const AddBookForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        published_date: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then((res) => res.json())
        .then((data) => alert(data.message));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" onChange={handleChange} />
            <input name="author" placeholder="Author" onChange={handleChange} />
            <input name="genre" placeholder="Genre" onChange={handleChange} />
            <input name="published_date" placeholder="Published Date" onChange={handleChange} />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBookForm;
