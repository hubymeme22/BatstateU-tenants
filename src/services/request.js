// Contains the https request for the admin (uses axios)

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api/';
axios.defaults.withCredentials = true;

/* ---------- PUBLIC ---------- */

export const loginAdmin = async (adminData) => {
  return await axios
    .post('login/admin', adminData)
    .then((response) => {
      const res = response.data;
      return res;
    })
    .catch((error) => {});
};

export const loginStudent = async (studentData) => {
  return await axios
    .post('login', studentData)
    .then((response) => {
      const res = response.data;
      return res;
    })
    .catch((error) => {});
};

export const validateToken = async (token, permission = 'student') => {
  return axios
    .post(`check-token/${permission}`, { token })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/* ---------- ADMIN ---------- */

// GET REQUESTS
export const fetchAsAdmin = async (route) => {
  return await axios
    .get(`admin/${route}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

// POST REQUESTS

// Dashboard - Creating invoice
export const createBilling = async (room, billingInformation) => {
  return await axios
    .post(`admin/billing/${room}`, billingInformation)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

/* ---------- STUDENTS ---------- */
