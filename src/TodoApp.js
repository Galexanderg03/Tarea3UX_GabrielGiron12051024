import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Agregar un nuevo ítem a la lista
  const addItem = () => {
    if (todoText.trim() !== '') {
      const newTodo = {
        text: todoText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTodoText('');
    }
  };

  const toggleItem = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteAllItems = () => {
    setTodos([]);
  };

  const deleteCompletedItems = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h1>Recordatorios</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Agregar nuevo ítem"
      />
      <button onClick={addItem}>Agregar</button>
      <button onClick={deleteCompletedItems}>Eliminar Completados</button>
      <button onClick={deleteAllItems}>Eliminar Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleItem(index)}
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
