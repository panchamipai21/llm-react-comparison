import React, { useState } from "react";
import "./App.css";

function App() {
  const flashcards = [
    {
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces.",
    },
    {
      question: "What is useState?",
      answer: "A React Hook for managing state in functional components.",
    },
    {
      question: "What is JSX?",
      answer: "A syntax extension that allows writing HTML inside JavaScript.",
    },
    {
      question: "What is a component?",
      answer: "Reusable, independent pieces of UI in React.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setCurrentIndex((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    );
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="container">
      <h1>Flashcards App</h1>

      <div className="card-container" onClick={handleFlip}>
        <div className={`card ${flipped ? "flipped" : ""}`}>
          <div className="card-front">
            {flashcards[currentIndex].question}
          </div>
          <div className="card-back">
            {flashcards[currentIndex].answer}
          </div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>

      <p className="progress">
        Card {currentIndex + 1} of {flashcards.length}
      </p>
    </div>
  );
}

export default App;
