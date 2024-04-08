import React from 'react'
import Proptypes from 'prop-types';

CheckAll.propTypes = {
    checkAll: Proptypes.func.isRequired,
}

function CheckAll(props) {
  return (
    <div className="button" onClick={props.checkAll}>Check All</div>
  )
}

export default CheckAll