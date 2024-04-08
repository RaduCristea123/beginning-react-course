import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';


function TodoClear() {
  const {todos, setTodos} = useContext(TodosContext);

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  return (
    <div>
      <button className="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </div> 
  );
}

export default TodoClear;
