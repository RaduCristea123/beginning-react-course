import '../reset.css';
import '../App.css';
import { useEffect, useRef, useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
  const [name, setName] = useLocalStorage('name', '');
  const [filter, setFilter] = useState('all');
  const nameInputEl = useRef(null);

  function todosFiltered() {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  useEffect(() => {
    nameInputEl.current.focus();
  }, []);

  function handleNameInput(event) {
    setName(event.target.value);
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        idForTodo,
        setIdForTodo,
        filter,
        setFilter,
        todosFiltered,
      }}
    >
      <div className="todo-app-container">
        <div className="todo-app">
          <div className="name-container">
            <h2>What is your name?</h2>
            <form action="#">
              <input
                type="text"
                ref={nameInputEl}
                className="todo-input"
                placeholder="Enter name."
                value={name}
                onChange={handleNameInput}
              ></input>
            </form>
            {name && <p className="name-label">Hello, {name}!</p>}
          </div>
          <h2>Todo App</h2>
          <TodoForm />
          {todos.length > 0 ? (
            <TodoList/>
          ) : (
            <NoTodos />
          )}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
