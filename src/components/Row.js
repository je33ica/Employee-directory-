const Row = ({ employee }) => {
  return (
    <tr>
      <td key={employee.login.uuid}>
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
    </tr>
  );
};
export default Row;
