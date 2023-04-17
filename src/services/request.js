// Contains the https request for the admin (uses axios)

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api';
axios.defaults.withCredentials = true;

import { getTokenCookie } from '../utils/tokenHandler';

/* ---------- PUBLIC ---------- */
export const loginAdmin = async (adminData) => {
  return await axios
    .post('/login/admin', adminData)
    .then((response) => response.data)
    .catch((error) => {});
};

export const loginStudent = async (studentData) => {
  return await axios
    .post('/login', studentData)
    .then((response) => response.data)
    .catch((error) => {});
};

export const validateToken = async (token, permission = 'student') => {
  return axios
    .post(`/check-token/${permission}`, { token })
    .then((response) => response.data)
    .catch((error) => {});
};

export const prepare = axios.defaults.baseURL + '/signatures/prepare';
export const reviewer = axios.defaults.baseURL + '/signatures/reviewer';
export const verifier = axios.defaults.baseURL + '/signatures/verifier';

export const getRGONames = async () => {
  return await axios
    .get('/names')
    .then((response) => response)
    .catch((error) => error);
};

/*############### ADMIN ############### */

export const fetchAsAdmin = async (route) => {
  return await axios
    .get(`/admin/${route}`)
    .then((response) => response)
    .catch((error) => {});
};

// By Page Routes

/*----------- Dashboard page -----------*/
export const createBilling = async (room, billingInformation) => {
  return await axios
    .post(`/admin/billing/multiple/${room}`, billingInformation)
    .then((response) => response)
    .catch((error) => {});
};

/*----------- Tenants page -----------*/
export const getUserLogs = async (username) => {
  return await axios
    .get(`/admin/logger/invoice/${username}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export const changeTenantRoom = async (username, room_id) => {
  return await axios.post('/admin/students/room', {
    room_id,
    username,
    token: getTokenCookie(),
  });
};

export const markAsPaid = async (username) => {
  return await axios
    .put(`/admin/students/pay/${username}`)
    .then((response) => response)
    .catch((error) => {});
};

/*----------- User page -----------*/
export const verifyStudent = async (username) => {
  return await axios
    .put(`/admin/students/verify/${username}`)
    .then((response) => response)
    .catch((error) => {});
};

export const unverifyStudent = async (username) => {
  return await axios
    .put(`/admin/students/unverify/${username}`)
    .then((response) => response)
    .catch((error) => {});
};

export const deleteAccount = async (roomID, username) => {
  return await axios
    .delete(`/admin/billing/${roomID}/${username}`)
    .then((response) => response)
    .catch((error) => {});
};

/*--------- Annoucement page ---------*/

export const createAnnouncement = async (subject, message) => {
  return await axios
    .post('/admin/announce', { subject, message, token: getTokenCookie() })
    .then((response) => response)
    .catch((error) => {});
};

/*----------- Settings page -----------*/
export const updateDefaultPaymentValues = async (dorm, canteen) => {
  const routes = {
    water: '/admin/billing/update/waterBill/',
    room: '/admin/billing/update/roomBill/',
  };

  const updateValues = async (type, location, value) => {
    await axios.put(`${routes[type]}${location}/${value}`);
  };

  await Promise.all([
    updateValues('water', 'dorm', dorm.waterBill),
    updateValues('room', 'dorm', dorm.roomBill),
    updateValues('water', 'canteen', canteen.waterBill),
    updateValues('room', 'canteen', canteen.roomBill),
  ]);
};

export const addRoom = async (roomDetails) => {
  return await axios
    .post('/admin/slots/new', { ...roomDetails, token: getTokenCookie() })
    .then((response) => response)
    .catch((error) => {});
};

export const deleteRoom = async (room) => {
  return await axios
    .delete(`/admin/slots/${room}`)
    .then((response) => response)
    .catch((error) => {});
};

export const updateName = async (wholeName, adminRole) => {
  let role = '';

  switch (adminRole) {
    case 'prepare':
      role = 'preparedBy';
      break;
    case 'reviewer':
      role = 'reviewedBy';
      break;
    case 'verifier':
      role = 'verifiedBy';
      break;
  }

  return await axios
    .post(`/names/${role}`, { wholeName, token: getTokenCookie() })
    .then((response) => response)
    .catch((error) => {});
};

export const updateSignature = async (img, role) => {
  const formData = new FormData();

  formData.append('img', img);

  return await axios
    .post(`/signatures/${role}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response)
    .catch((error) => {});
};

/* ############### STUDENTS ############### */

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
    .post('/register/student', data)
    .then((response) => response)
    .catch((error) => {});
};

export const updateAccountInfo = async (data) => {
  return await axios
    .post('/student/update-info', data)
    .then((response) => response)
    .catch((error) => {});
};

export const getStudentAnnouncements = async () => {
  return await axios
    .get('/student/announcement')
    .then((response) => response)
    .catch((error) => {});
};

// Forgot Password
export const forgotPass = async (email) => {
  return await axios
    .post('/forgotpass', email)
    .then((response) => response)
    .catch((error) => {});
};

export const enterPin = async (pin) => {
  const retrievedCode = localStorage.getItem('code');
  console.log(pin, retrievedCode);

  return await axios
    .post(`/forgotpass/pin/${retrievedCode}`, { pin })
    .then((response) => response)
    .catch((error) => {});
};

export const resetAccountPassword = async (password) => {
  const retrievedKey = localStorage.getItem('key');
  return await axios
    .post(`/forgotpass/change/${retrievedKey}`, { password })
    .then((response) => response)
    .catch((error) => {});
};
