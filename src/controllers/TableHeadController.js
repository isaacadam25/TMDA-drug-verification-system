import React from "react";

const TableHeadController = (props) => {
  const { headcells } = props;

  return (
    <thead>
      <tr>
        {headcells &&
          headcells.map((headcell) => (
            <th key={headcell.id}>{headcell.title}</th>
          ))}
      </tr>
    </thead>
  );
};

export default TableHeadController;
