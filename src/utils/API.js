import axios from "axios";
const BASEURL = "https://randomuser.me/api/?results=1";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getSearch: function(query){
    return axios.get(BASEURL + query);
  }
};
