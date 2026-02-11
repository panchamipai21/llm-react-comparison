import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for storing todos
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toLocaleString()
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Calculate statistics
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="App">
      <div className="container">
        <h1>📝 My Todo List</h1>
        
        {/* Statistics */}
        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Active: {activeCount}</span>
          <span>Completed: {completedCount}</span>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button type="submit" className="add-btn">Add</button>
        </form>

        {/* Filter Buttons */}
        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Todo List */}
        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty-state">No todos yet! Add one above.</li>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="checkbox"
                />
                <div className="todo-content">
                  <span className="todo-text">{todo.text}</span>
                  <span className="todo-date">{todo.createdAt}</span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-btn"
                >
                  BIN
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <button onClick={clearCompleted} className="clear-btn">
            Clear Completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}

export default App;