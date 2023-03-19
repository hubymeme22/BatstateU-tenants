import axios from 'axios';
import { checkToken } from '../utils/tokenHandler';

axios.defaults.baseURL = 'http://localhost:5050/api/';
axios.defaults.withCredentials = true;

const fetchData = async (route) => {
  const token = checkToken();

  if (!token) {
    throw new Error('Authorization token is missing.');
  }

  return await axios
    .get(route)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default fetchData;
