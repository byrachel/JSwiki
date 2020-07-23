import React from 'react';
import './Pagination.scss';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav id="pagination-block">
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} >
            <a onClick={() => paginate(number)} href='#' className={ currentPage === number ? 'active' : null}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;