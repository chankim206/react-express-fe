import React from "react";
import "./pagination.css";

function Pagination({ currentPage, todosPerPage, totalTodos, changePage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li
            onClick={() => changePage(number)}
            key={number}
            className={
              number === currentPage ? "page-item current" : "page-item"
            }
          >
            <a
              onClick={() => changePage(number)}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
