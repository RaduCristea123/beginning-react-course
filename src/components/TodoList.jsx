import React, { useState } from 'react';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClear from './TodoClear';
import Proptypes from 'prop-types';
import CheckAll from './CheckAll';
import TodoFilters from './TodoFilters';
import useToggle from '../hooks/useToggle';

TodoList.propTypes = {
  todos: Proptypes.array.isRequired,
  completeTodo: Proptypes.func.isRequired,
  toggleEditing: Proptypes.func.isRequired,
  updateTodo: Proptypes.func.isRequired,
  cancelEdit: Proptypes.func.isRequired,
  deleteTodo: Proptypes.func.isRequired,
  remaining: Proptypes.number.isRequired,
  clearCompleted: Proptypes.func.isRequired,
  checkAll: Proptypes.func.isRequired,
  todosFiltered: Proptypes.func.isRequired,
};

function TodoList(props) {
  const [filter, setFilter] = useState('all');
  const [featureOneVisible, setFeatureOneVisible] = useToggle();
  const [featureTwoVisible, setFeatureTwoVisible] = useToggle();

  return (
    <>
      <ul className="todo-list">
        {props.todosFiltered(filter).map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => props.completeTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              />
              {!todo.isEditing && (
                <span
                  onDoubleClick={() => props.toggleEditing(todo.id)}
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
                      props.updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      props.cancelEdit(event, todo.id);
                    }
                  }}
                  // eslint-disable-next-line no-restricted-globals
                  onBlur={() => props.updateTodo(event, todo.id)}
                  type="text"
                  className="todo-item-input"
                  defaultValue={todo.title}
                  autoFocus
                />
              )}
            </div>
            <button
              className="x-button"
              onClick={() => props.deleteTodo(todo.id)}
            >
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
        <button
          className="button"
          onClick={setFeatureOneVisible}
        >
          Feature One Toggle
        </button>
        <button
          className="button"
          onClick={setFeatureTwoVisible}
        >
          Feature Two Toggle
        </button>
      </div>
      {featureOneVisible && (
        <div className="check-all-container">
          <div>
            <CheckAll checkAll={props.checkAll} />
          </div>
          <TodoItemsRemaining remaining={props.remaining} />
        </div>
      )}
      {featureTwoVisible &&(
        <div className="other-buttons-container">
          <TodoFilters
            todosFiltered={props.todosFiltered}
            filter={filter}
            setFilter={setFilter}
          />
          <TodoClear clearCompleted={props.clearCompleted} />
        </div>
      )}
    </>
  );
}

export default TodoList;
