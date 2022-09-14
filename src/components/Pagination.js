import { Button } from "antd";
import React from "react";

const Pagination = ({ moviesPerPage, totalMovies, paginateHandler }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((num) => (
        <Button key={num} onClick={() => paginateHandler(num)}>
          {num}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
