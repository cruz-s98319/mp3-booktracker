import React from 'react';
import './App.css';

function App() {
  const handleButtonClick = () => {
    alert('Get Started button clicked!');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to Book Tracker App</h1>
        <p>Your app is running successfully!</p>
      </header>
      <main>
        <button className="primary-button" onClick={handleButtonClick}>
          Get Started
        </button>
      </main>
    </div>
  );
}

export default App;
