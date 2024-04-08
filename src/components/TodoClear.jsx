import React from 'react';
import Proptypes from 'prop-types';

TodoClear.propTypes = {
  clearCompleted: Proptypes.func.isRequired,
};

function TodoClear(props) {
  return (
    <div>
      <button className="button" onClick={props.clearCompleted}>
        Clear completed
      </button>
    </div> 
  );
}

export default TodoClear;
