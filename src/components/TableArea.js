import React, { Component } from "react";
import API from "../utils/API";
import TableRow from "./TableRow";

const TableArea = ({ employees }) => {
  return (
    <div>
      {employees.length > 0 ? (
        <table className="striped bordered hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => {
              return <TableRow employee={employee} key={index} index={index} />;
            })}
          </tbody>
        </table>
      ) : (
        <p>Loading Data...</p>
      )}
    </div>
  );

  //make a table - bootstap
  //head- top row with column defintions
  //table body, map employees for each employee we will make a row
  //pass props into each row
  //each row will be a component

  // const [employee, setEmployee] = useState()
  // declare state and this is where the employee data.
  // We know we need employees and filtered employees
  //handleSearch function - takes the inchange event from the nav and filters the employees
  //handleSort function - this is going to be passed to the table
  //component did mount should make a call to the api and return the data
  //that data is going to be set in state
  //inside the render we will have the navbar which is going to be passed a handleSearch function on props
  //another component called Table which will take the employees object and handle sort function
};
export default TableArea;

//results.name.title
//results.name.first
//results.name.last
//results.location.city
//results.location.country
//results.email
//results.'d.o.b'.date
//results.'d.o.b'.age
//reults.picture.thumbnail
