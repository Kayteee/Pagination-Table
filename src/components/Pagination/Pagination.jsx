import React from "react";
import './Pagination.css';
import { nextButton, prevButton } from "../../constants";

function Pagination({ totalRecords, recordsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        &lt; {prevButton}
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        {nextButton} &gt;
      </button>
    </div>
  );
}

export default Pagination;
