/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';

function Blog() {
  return (
    <div className="container">
      <ul>
        <li>
          <NavLink to="/blog/1">Post One</NavLink>
        </li>
        <li>
          <NavLink to="/blog/2">Post Two</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Blog;
