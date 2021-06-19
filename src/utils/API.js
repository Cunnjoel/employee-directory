import axios from "axios";
const BASEURL = "https://randomuser.me/api/?results=15";

export default {
  search: function(query) {
    return axios.get(BASEURL + query);
  }
};
