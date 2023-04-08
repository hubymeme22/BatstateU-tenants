// Contains the https request for the admin (uses axios)

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api/';
axios.defaults.withCredentials = true;

/* ---------- PUBLIC ---------- */

export const loginAdmin = async (adminData) => {
  return await axios
    .post('login/admin', adminData)
    .then((response) => response.data)
    .catch((error) => {});
};

export const loginStudent = async (studentData) => {
  return await axios
    .post('login', studentData)
    .then((response) => response.data)
    .catch((error) => {});
};

export const validateToken = async (token, permission = 'student') => {
  return axios
    .post(`check-token/${permission}`, { token })
    .then((response) => response.data)
    .catch((error) => {});
};

/* ---------- ADMIN ---------- */

// GET REQUESTS
export const fetchAsAdmin = async (route) => {
  return await axios
    .get(`admin/${route}`)
    .then((response) => response)
    .catch((error) => {});
};

// POST REQUESTS
// Dashboard - Creating invoice
export const createBilling = async (room, billingInformation) => {
  return await axios
    .post(`admin/billing/multiple/${room}`, billingInformation)
    .then((response) => response)
    .catch((error) => {});
};

// Tenants
export const markAsPaid = async (username) => {
  return await axios
    .put(`admin/students/pay/${username}`)
    .then((response) => response)
    .catch((error) => {});
};

// PUT REQUEST
// User page
export const verifyStudent = async (username) => {
  return await axios
    .put(`admin/students/verify/${username}`)
    .then((response) => response)
    .catch((error) => {});
};

export const unverifyStudent = async (username) => {
  return await axios
    .put(`admin/students/unverify/${username}`)
    .then((response) => response)
    .catch((error) => {});
};

// DELETE REQUEST

export const deleteAccount = async (roomID, username) => {
  return await axios
    .delete(`admin/billing/${roomID}/${username}`)
    .then((response) => response)
    .catch((error) => {});
};

/* ---------- STUDENTS ---------- */

export const getStudentDetails = async () => {
  return await axios
    .get('/student/details')
    .then((response) => response)
    .catch((error) => {});
};

export const getStudentBilligns = async () => {
  return await axios
    .get('/student/billing/finalized')
    .then((response) => response)
    .catch((error) => {});
};

export const registerStudent = async (data) => {
  return await axios
    .post('register/student', data)
    .then((response) => response)
    .catch((error) => {});
};

export const updateAccountInfo = async (data) => {
  return await axios
    .post('student/update-info', data)
    .then((response) => response)
    .catch((error) => {});
};

export const getStudentAnnouncements = async () => {
  return await axios
    .get('student/announcement')
    .then((response) => response)
    .catch((error) => {});
};
//forgot password
export const forgotPass = async (email) => {
  return await axios
    .post('/forgotpass', email)
    .then((response) => response)
    .catch((error) => {});
};
