import React, { useContext, useMemo } from 'react'
import { TodosContext } from '../context/TodosContext';


function TodoItemsRemaining() {

  const {todos} = useContext(TodosContext);

  function remainingItems() {
    console.log('lalalla');
    return todos.filter(todo => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingItems, [todos]);

  return (
    <span>{remaining} items remaining</span>
  )
}

export default TodoItemsRemaining