import { Button } from "antd";
import React from "react";

const Pagination = ({ totalPages, paginateHandler }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  console.log(pageNumbers);

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
