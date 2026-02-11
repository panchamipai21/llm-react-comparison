import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h1>React Todo List</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.length === 0 && (
            <p className="empty">No tasks yet 🚀</p>
          )}

          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span
                className={todo.completed ? "completed" : ""}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteTask(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
