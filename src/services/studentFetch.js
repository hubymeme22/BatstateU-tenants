// Fetch as user
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api/student';
axios.defaults.withCredentials = true;

export const fetchAsStudent = async (route) => {
  return await axios
    .get(route)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
