import { useState, useEffect } from "react";
import axios from "axios";
import API from "../utils/API";
// const { getEmployees } = API;

const Table = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=100")

      .then((res) => {
        const employeeData = res.data.results;
        setEmployeeData(employeeData);
        console.log("im the employees", employeeData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <table>
      <thead>
        <th>NAME</th>
        <th>PICTURE</th>
        <th>EMAIL</th>
        <th>lOCATION</th>
        <th>AGE</th>
      </thead>

      <tbody>
        {employeeData.map(({ id, name, picture, email, location, dob }) => {
          return (
            <tr key={id}>
              <td>
                {name.first} &nbsp;
                {name.last}
              </td>
              <td>
                <img src={picture.thumbnail} />
              </td>
              <td>{email}</td>
              <td>
                {location.city}, {location.country}
              </td>
              <td>{dob.age}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
