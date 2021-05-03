const Row = ({ employee }) => {
  return (
    <tr>
      <th scope="row" key={employee.login.uuid}>
        <td>
          {employee.name.first} &nbsp;
          {employee.name.last}
        </td>
        <td>
          <img alt="User-Profile" src={employee.picture.thumbnail} />
        </td>
        <td>{employee.email}</td>
        <td>
          {employee.location.city}, {employee.location.country}
        </td>
        <td>{employee.dob.age}</td>
      </th>
    </tr>
  );
};
export default Row;
