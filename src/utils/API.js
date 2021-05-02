import axios from "axios";

export default {
  getEmployees: function () {
    axios.get("https://randomuser.me/api/?results=100");
  },
};
