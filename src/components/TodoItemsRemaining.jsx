import React from 'react'
import Proptypes from 'prop-types';

TodoItemsRemaining.propTypes = {
    remaining: Proptypes.number.isRequired,
}

function TodoItemsRemaining(props) {
  return (
    <span>{props.remaining} items remaining</span>
  )
}

export default TodoItemsRemaining