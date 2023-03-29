// Fetch as admin

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api/admin/';
axios.defaults.withCredentials = true;

export const fetchAsAdmin = async (route) => {
  return await axios
    .get(route)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
