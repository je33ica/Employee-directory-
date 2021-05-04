import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons/icons";
import Row from "./Row";

import "../index.css";

const Table = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [sortedField, setSortedField] = useState([]);
  const [search, setSearch] = useState("");
  const [displayedEmployess, setDisplayedEmployess] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=100")

      .then((res) => {
        setEmployeeData(res.data.results);
        setDisplayedEmployess(res.data.results);
        setSortedField(res.data.results);
        // setDisplayedEmployess(res.data.results)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sortAscending = () => {
    let sortArr = [...sortedField];
    sortArr.sort(function (a, b) {
      if (a.dob.age < b.dob.age) {
        return -1;
      }
      return 0;
    });

    setEmployeeData([...sortArr]);
  };
  const sortDescending = () => {
    let sortArr = [...sortedField];
    sortArr.sort(function (a, b) {
      if (a.dob.age > b.dob.age) {
        return -1;
      }
      return 0;
    });
    setEmployeeData([...sortArr]);
  };

  const sortNameUp = () => {
    let sortArr = [...sortedField];
    sortArr.sort(function (a, b) {
      if (a.name.first > b.name.first) {
        return -1;
      }
      return 0;
    });
    setEmployeeData([...sortArr]);
  };

  const sortNameDown = () => {
    let sortArr = [...sortedField];
    sortArr.sort(function (a, b) {
      if (a.name.first < b.name.first) {
        return -1;
      }
      return 0;
    });
    setEmployeeData([...sortArr]);
  };

  const handleInputChange = ({ target }) => {
    const searched = target.value;
    setSearch(searched);

    let filterResult = [];
    if (searchFilterRef.current.value !== "name") {
      //filter by location
      filterResult = employeeData.filter((employee) => {
        return (
          //use bracket notation to set the dynamic property value on the object
          employee.location[searchFilterRef.current.value]
            .toLowerCase()
            .indexOf(searched.toLowerCase()) !== -1
        );
      });
    } else {
      filterResult = employeeData.filter((employee) => {
        return employee.name.first
          .toLowerCase()
          .indexOf(searched.toLowerCase()) !== -1
          ? true
          : false;
      });
    }
    setEmployeeData([...filterResult]);
  };

  const clearSearch = () => {
    setSearch("");
    setEmployeeData([...displayedEmployess]);
  };

  const searchFilterRef = useRef("");

  return (
    <>
      <div>
        <h1>Employee Directory </h1>
      </div>
      <div className="search">
        <select ref={searchFilterRef} id="searchFilter">
          {/* setting default value as name so somethign is always selected when func runs */}
          <option value="name">--Please choose an option--</option>
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="country">Country</option>
        </select>

        <input type="text" value={search} onChange={handleInputChange} />
        <button onClick={() => clearSearch()}>Clear Search</button>
      </div>
      <table className="table">
        <thead>
          <th>NAME</th>
          <th>PICTURE</th>
          <th>EMAIL</th>
          <th>LOCATION</th>
          <th>AGE</th>
        </thead>

        <tr>
          <th>
            Sort by first name
            <button className="ascending" onClick={() => sortNameUp()}>
              <FontAwesomeIcon icon={icons.upArr} />
            </button>
            <button className="descending" onClick={() => sortNameDown()}>
              <FontAwesomeIcon icon={icons.downArr} />
            </button>
          </th>
          <th></th>
          <th></th>
          <th></th>
          <th>
            Sort by age
            <button className="ascending" onClick={() => sortAscending()}>
              <FontAwesomeIcon icon={icons.upArr} />
            </button>
            <button className="descending" onClick={() => sortDescending()}>
              <FontAwesomeIcon icon={icons.downArr} />
            </button>
          </th>
        </tr>

        <tbody className="tbody">
          {employeeData.map((employee) => (
            <Row employee={employee} key={employee.login.uuid} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
