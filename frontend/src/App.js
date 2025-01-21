import React, { useState } from "react";
import AddBookForm from "./components/AddBookForm";

const App = () => {
    const [showForm, setShowForm] = useState(false);

    const handleGetStarted = () => {
        setShowForm(true);
    };

    return (
        <div>
            <h1>Welcome to the Book Tracker App</h1>
            {!showForm ? (
                <button onClick={handleGetStarted}>Get Started</button>
            ) : (
                <AddBookForm />
            )}
        </div>
    );
};

export default App;
