import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for flashcards
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // State for new flashcard form
  const [newCard, setNewCard] = useState({
    question: '',
    answer: ''
  });

  // Sample flashcards
  const sampleCards = [
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
    { id: 2, question: 'What is JSX?', answer: 'JavaScript XML - syntax extension for writing HTML in JavaScript' },
    { id: 3, question: 'What is a Hook?', answer: 'Functions that let you use state and lifecycle features in function components' },
    { id: 4, question: 'What is useState?', answer: 'A Hook that lets you add state to function components' },
    { id: 5, question: 'What is useEffect?', answer: 'A Hook for performing side effects in function components' }
  ];

  // Load flashcards from localStorage or use sample cards
  useEffect(() => {
    const saved = localStorage.getItem('flashcards');
    if (saved) {
      setFlashcards(JSON.parse(saved));
    } else {
      setFlashcards(sampleCards);
    }
  }, []);

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    if (flashcards.length > 0) {
      localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
  }, [flashcards]);

  // Flip card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Next card
  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  // Previous card
  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  // Add new flashcard
  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.question.trim() && newCard.answer.trim()) {
      const card = {
        id: Date.now(),
        question: newCard.question,
        answer: newCard.answer
      };
      setFlashcards([...flashcards, card]);
      setNewCard({ question: '', answer: '' });
      setShowForm(false);
      setCurrentIndex(flashcards.length); // Move to new card
    }
  };

  // Delete current flashcard
  const handleDelete = () => {
    if (window.confirm('Delete this flashcard?')) {
      const newCards = flashcards.filter((_, index) => index !== currentIndex);
      setFlashcards(newCards);
      if (currentIndex >= newCards.length) {
        setCurrentIndex(Math.max(0, newCards.length - 1));
      }
      setIsFlipped(false);
    }
  };

  // Shuffle flashcards
  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Reset to sample cards
  const handleReset = () => {
    if (window.confirm('Reset to sample flashcards? This will delete all custom cards.')) {
      setFlashcards(sampleCards);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  if (flashcards.length === 0) {
    return (
      <div className="App">
        <div className="container">
          <h1>📚 Flashcards App</h1>
          <div className="empty-state">
            <p>No flashcards yet!</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary">
              Create Your First Card
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📚 Flashcards App</h1>
          <div className="controls">
            <button onClick={() => setShowForm(!showForm)} className="btn btn-add">
              ➕ Add Card
            </button>
            <button onClick={handleShuffle} className="btn btn-shuffle">
              🔀 Shuffle
            </button>
            <button onClick={handleReset} className="btn btn-reset">
              🔄 Reset
            </button>
          </div>
        </header>

        <div className="progress">
          <span className="progress-text">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Create New Flashcard</h2>
              <form onSubmit={handleAddCard}>
                <div className="form-group">
                  <label>Question:</label>
                  <textarea
                    value={newCard.question}
                    onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                    placeholder="Enter the question..."
                    rows="3"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Answer:</label>
                  <textarea
                    value={newCard.answer}
                    onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                    placeholder="Enter the answer..."
                    rows="3"
                    required
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="btn btn-primary">Create Card</button>
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flashcard-container">
          <div 
            className={`flashcard ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div className="card-label">Question</div>
                <div className="card-content">{currentCard.question}</div>
                <div className="card-hint">Click to reveal answer</div>
              </div>
              <div className="flashcard-back">
                <div className="card-label">Answer</div>
                <div className="card-content">{currentCard.answer}</div>
                <div className="card-hint">Click to see question</div>
              </div>
            </div>
          </div>
        </div>

        <div className="navigation">
          <button 
            onClick={handlePrevious} 
            className="nav-btn"
            disabled={flashcards.length <= 1}
          >
            ← Previous
          </button>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete
          </button>
          <button 
            onClick={handleNext} 
            className="nav-btn"
            disabled={flashcards.length <= 1}
          >
            Next →
          </button>
        </div>

        <div className="keyboard-hint">
          💡 Tip: Click card to flip • Use buttons to navigate
        </div>
      </div>
    </div>
  );
}

export default App;