import '../reset.css';
import '../App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  // useState([
  //   {
  //     id: 1,
  //     title: 'Finish react course',
  //     isComplete: false,
  //     isEditing: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Go grocery shopping',
  //     isComplete: true,
  //     isEditing: false,
  //   },
  //   {
  //     id: 3,
  //     title: 'Take over the world',
  //     isComplete: false,
  //     isEditing: false,
  //   },
  // ]);

  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
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

  function toggleEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }
      return todo;
    });
    setTodos(updatedTodos);
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

  function cancelEdit(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function remainingItems() {
    console.log('lalalla');
    return todos.filter(todo => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingItems, [todos]);

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function checkAll() {
    const updatedTodos = todos.map(todo => {
      todo.isComplete = true;
      return todo;
    });
    setTodos(updatedTodos);
  }

  function todosFiltered(filter) {
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
    <TodosContext.Provider value={{todos, setTodos, idForTodo, setIdForTodo}}>
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
          <TodoForm/>
          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              completeTodo={completeTodo}
              toggleEditing={toggleEditing}
              cancelEdit={cancelEdit}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              remaining={remaining}
              clearCompleted={clearCompleted}
              checkAll={checkAll}
              todosFiltered={todosFiltered}
            />
          ) : (
            <NoTodos />
          )}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
