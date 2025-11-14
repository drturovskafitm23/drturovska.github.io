import { useState } from 'react'
import './App.css'

function Todo({ todo, onCheck, onDelete }) {
  return (
    <li className="list-group-item d-flex align-items-center">
      <input
        type="checkbox"
        className="form-check-input me-2"
        id={todo.id}
        checked={todo.checked}
        onChange={() => onCheck(todo.id)}
      />

      <label htmlFor={todo.id} className="flex-grow-1">
        <span className={todo.checked ? 'text-success text-decoration-line-through' : ''}>
          {todo.text}
        </span>
      </label>

      <button className="btn btn-danger btn-sm" onClick={() => onDelete(todo.id)}>
        delete
      </button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Вивчити HTML", checked: true },
    { id: 2, text: "Вивчити CSS", checked: true },
    { id: 3, text: "Вивчити JavaScript", checked: false }
  ]);

  // Лічильники
  const total = todos.length;
  const unchecked = todos.filter(t => !t.checked).length;

  // Додати нову справу
  const newTodo = () => {
    const text = prompt("Введіть нову задачу:");
    if (!text) return;

    const newItem = {
      id: Date.now(),
      text,
      checked: false
    };

    setTodos([...todos, newItem]);
  };

  // Позначити виконаною / невиконаною
  const checkTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  // Видалити задачу
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <h1 className="mt-5">My TODO App</h1>

      <div className="mb-3">
        <span className="me-3">
          Item count: <span>{total}</span>
        </span>
        <span>
          Unchecked count: <span>{unchecked}</span>
        </span>
      </div>

      <button className="btn btn-primary mb-3" onClick={newTodo}>
        New TODO
      </button>

      <ul className="list-group">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onCheck={checkTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;