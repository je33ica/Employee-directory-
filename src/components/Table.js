import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons/icons";

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
    console.log(searchFilterRef.current.value, "im the ref");
    const searched = target.value;
    setSearch(searched);
    // if (searched.length === 0) {
    //   return displayedEmployess();
    // }

    let filterResult = [];
    if (searchFilterRef.current.value !== "name") {
      //filter by location
      filterResult = employeeData.filter((employee) => {
        return (
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
    console.log("im the filter", filterResult);
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
      <table>
        <thead>
          <tr>
            <th>
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
              {/* <tr>
                sort by second name
                <button className="ascending" onClick={() => sortNameUp2()}>
                  <FontAwesomeIcon icon={icons.upArr} />
                </button>
                <button className="descending" onClick={() => sortNameDown2()}>
                  <FontAwesomeIcon icon={icons.downArr} />
                </button>
              </tr> */}
            </th>
            <th>PICTURE</th>
            <th>EMAIL</th>
            <th>LOCATION</th>
            <th>
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
          {employeeData.map(
            ({ login, name, picture, email, location, dob }) => {
              return (
                <tr key={login.uuid}>
                  <td>
                    {name.first} &nbsp;
                    {name.last}
                  </td>
                  <td>
                    <img alt="User-Profile" src={picture.thumbnail} />
                  </td>
                  <td>{email}</td>
                  <td>
                    {location.city}, {location.country}
                  </td>
                  <td>{dob.age}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;

//if (sortNameUp = () => {
//     let sortArr = [...sortedField];
//     sortArr.sort(function (a, b) {
//       if (a.name.first > b.name.first) {
//         return -1;
//       }
//       return 0;
//     });
//     setEmployeeData([...sortArr]);
//   };
//   const sortNameDown = () => {
//     let sortArr = [...sortedField];
//     sortArr.sort(function (a, b) {
//       if (a.name.first < b.name.first) {
//         return -1;
//       }
//       return 0;
//     });
//     setEmployeeData([...sortArr]);
//   };
