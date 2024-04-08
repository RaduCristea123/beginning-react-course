import React, { useState, useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoForm() {
  const [todoInput, setTodoInput] = useState('');
  const {todos, setTodos, idForTodo, setIdForTodo} = useContext(TodosContext);

  function readInput(event) {
    setTodoInput(event.target.value);
  }

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      alert("You can't add an empty TODO");
      return;
    }

    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setIdForTodo(prevIdForTodo => prevIdForTodo + 1);

    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={addTodo}>
      <input
        type="text"
        value={todoInput}
        onChange={readInput}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}



export default TodoForm;
