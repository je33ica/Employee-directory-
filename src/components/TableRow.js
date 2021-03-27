import React from "react";

const TableRow = ({ employee, index }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <img src={employee.picture.thumbnail} alt="employee-thumbnail"></img>
      </td>
      <td>{`${employee.name.first} ${employee.name.last}`}</td>
      <td>{employee.dob.age}</td>
      <td>{employee.location.city}</td>
      <td>{employee.location.country}</td>
    </tr>
  );
};

export default TableRow;
