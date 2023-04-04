import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api/admin/';
axios.defaults.withCredentials = true;

export const createBilling = async (room, billingInformation) => {
  return await axios
    .post(`billing/${room}`, billingInformation)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
