import React, { useContext } from 'react';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClear from './TodoClear';
import CheckAll from './CheckAll';
import TodoFilters from './TodoFilters';
import useToggle from '../hooks/useToggle';
import { TodosContext } from '../context/TodosContext';


function TodoList() {
  const { todos, setTodos, filter, setFilter, todosFiltered } = useContext(TodosContext);
  const [featureOneVisible, setFeatureOneVisible] = useToggle();
  const [featureTwoVisible, setFeatureTwoVisible] = useToggle();

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = !todo.isEditing;
          return todo;
        }
        todo.isEditing = !todo.isEditing;
        todo.title = event.target.value;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function toggleEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function completeTodo(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function cancelEdit(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <>
      <ul className="todo-list">
        {todosFiltered().map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => completeTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              />
              {!todo.isEditing && (
                <span
                  onDoubleClick={() => toggleEditing(todo.id)}
                  className={`${
                    todo.isComplete ? 'line-through' : ''
                  } "todo-item-label"`}
                >
                  {todo.title}
                </span>
              )}
              {todo.isEditing && (
                <input
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      cancelEdit(event, todo.id);
                    }
                  }}
                  // eslint-disable-next-line no-restricted-globals
                  onBlur={() => updateTodo(event, todo.id)}
                  type="text"
                  className="todo-item-input"
                  defaultValue={todo.title}
                  autoFocus
                />
              )}
            </div>
            <button className="x-button" onClick={() => deleteTodo(todo.id)}>
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round "
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="toggles-container">
        <button className="button" onClick={setFeatureOneVisible}>
          Feature One Toggle
        </button>
        <button className="button" onClick={setFeatureTwoVisible}>
          Feature Two Toggle
        </button>
      </div>
      {featureOneVisible && (
        <div className="check-all-container">
          <div>
            <CheckAll />
          </div>
          <TodoItemsRemaining/>
        </div>
      )}
      {featureTwoVisible && (
        <div className="other-buttons-container">
          <TodoFilters
            todosFiltered={todosFiltered}
            filter={filter}
            setFilter={setFilter}
          />
          <TodoClear />
        </div>
      )}
    </>
  );
}

export default TodoList;
