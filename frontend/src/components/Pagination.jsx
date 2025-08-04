import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages === 0) return null;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-8 gap-2 text-[14px]">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 disabled:opacity-50"
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => goToPage(num)}
          className={`px-3 py-1 rounded ${
            num === currentPage
              ? "bg-[var(--color-highlight)] text-[var(--color-black)]"
              : "text-[var(--color-black)]"
          }`}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
