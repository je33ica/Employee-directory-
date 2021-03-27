import React, { Component, useEffect, useState } from "react";

import TableArea from "./TableArea";
import API from "../utils/API";

const Main = () => {
  const [employees, setEmployeesState] = useState([]);
  useEffect(() => {
    API.getEmployees().then((result) => {
      setEmployeesState(result.data.results);
    });
  }, []);
  return (
    <>
      <TableArea employees={employees} />
    </>
  );
};

export default Main;
