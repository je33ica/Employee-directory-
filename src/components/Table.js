import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons/icons";
import Row from "./Row";

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
        <h1>Search Employee</h1>
      </div>
      <select ref={searchFilterRef} id="searchFilter">
        {/* setting default value as name so somethign is always selected when func runs */}
        <option value="name">--Please choose an option--</option>
        <option value="name">Name</option>
        <option value="city">City</option>
        <option value="country">Country</option>
      </select>
      <input type="text" value={search} onChange={handleInputChange} />
      <button onClick={() => clearSearch()}>clear Search</button>
      <table style={{ tableLayout: "auto", width: "100%" }}>
        <thead>
          <tr>
            <th scope="col">
              NAME
              <tr>
                sort by first name
                <button className="ascending" onClick={() => sortNameUp()}>
                  <FontAwesomeIcon icon={icons.upArr} />
                </button>
                <button className="descending" onClick={() => sortNameDown()}>
                  <FontAwesomeIcon icon={icons.downArr} />
                </button>
              </tr>
            </th>
            <th scope="col">PICTURE</th>
            <th scope="col">EMAIL</th>
            <th scope="col">LOCATION</th>
            <th scope="col">
              AGE
              <tr>
                sort by age
                <button className="ascending" onClick={() => sortAscending()}>
                  <FontAwesomeIcon icon={icons.upArr} />
                </button>
                <button className="descending" onClick={() => sortDescending()}>
                  <FontAwesomeIcon icon={icons.downArr} />
                </button>
              </tr>
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <Row employee={employee} key={employee.login.uuid} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
